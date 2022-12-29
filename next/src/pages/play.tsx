import { useCallback, useContext, useEffect, useState } from "react";
import Head from "next/head";
import { Button, Chip } from "@mantine/core";
import { IconCircle, IconTrophy, IconX } from "@tabler/icons";
import { useRouter } from "next/router";

import scss from "@styles/pages/play.module.scss";
import Splash from "@components/Splash";
import TicTacLoader from "@components/TicTacLoader";
import BoltSvg from "@svg/Bolt";
import useIsMount from "@hooks/useIsMount";
import { SocketContext } from "@context/Socket";
import { SessionContext } from "@context/Session";
import { clsx } from "utils";

type Winner = "p1" | "p2" | "none" | undefined;
interface Payload {
  newMarker: 1 | 2;
  gridArray: number[];
  wonBy: Winner;
}
const markerOf = (player: "p1" | "p2") => Number(player.at(-1));
const otherPlayer = (curr: "p1" | "p2") => (curr === "p1" ? "p2" : "p1");

const PlayPage = () => {
  const router = useRouter();
  const isMount = useIsMount();
  const socket = useContext(SocketContext);
  const [session, setSession] = useContext(SessionContext);

  useEffect(() => {
    if (!session) {
      setTimeout(() => {
        router.push("/setup");
      }, 1500);
    }
  }, [session, router]);

  const [gridSize, setGridSize] = useState("3");
  const [board, setBoard] = useState<Array<number>>(Array(9).fill(0));
  const [turn, setTurn] = useState(session?.firstMover ?? "p1");
  const [winner, setWinner] = useState<Winner>();

  const resetGrid = (size: number) => {
    setGridSize(size.toString());
    setBoard(Array(size * size).fill(0));
    setWinner(undefined);
  };

  const playAgain = useCallback(() => {
    resetGrid(Number(gridSize));
    const other = otherPlayer(session!.firstMover);
    setTurn(other);
    setSession({ ...session!, firstMover: other });
  }, [gridSize, session, setSession]);

  const emitPlayAgain = () => {
    socket.emit("playAgain", gridSize);
  };

  const checkForDraw = (board: number[]) => {
    if (board.indexOf(0) === -1) {
      setWinner("none");
    }
  };

  useEffect(() => {
    const onNextTurn = (payload: Payload) => {
      setTurn(`p${payload.newMarker}`);
      setBoard(payload.gridArray);
      if (payload.wonBy) {
        setWinner(payload.wonBy);
      } else {
        checkForDraw(payload.gridArray);
      }
    };
    socket.on("nextTurn", onNextTurn);

    const onUpdateGrid = (size: number) => {
      resetGrid(size);
      setTurn(session!.firstMover);
    };
    socket.on("updateGrid", onUpdateGrid);

    socket.on("resetGame", playAgain);

    const onDestroySession = () => {
      window.location.reload();
    };
    socket.on("destroySession", onDestroySession);

    return () => {
      socket.off("nextTurn", onNextTurn);
      socket.off("updateGrid", onUpdateGrid);
      socket.off("resetGame", playAgain);
      socket.off("destroySession", onDestroySession);
    };
  }, [playAgain, session, socket]);

  useEffect(() => {
    if (isMount) return;
    socket.emit("gridChange", Number(gridSize));
  }, [gridSize, socket, isMount]);

  const markSquare = (boardIndex: number) => {
    if (turn !== session!.iAm || board[boardIndex] || winner) {
      return;
    }
    const mark = markerOf(turn);
    setTurn((curr) => otherPlayer(curr));
    const updatedBoard = board.map((v, i) => (i === boardIndex ? mark : v));
    setBoard(updatedBoard);
    socket.emit("turnPlayed", { index: boardIndex, gridArray: updatedBoard });
  };

  const renderSquare = (boardIndex: number) => {
    if (board[boardIndex] === 0) {
      return null;
    } else if (board[boardIndex] === 1) {
      return <IconX />;
    } else {
      return <IconCircle />;
    }
  };

  if (!session) {
    return <Splash />;
  }

  return (
    <>
      <Head>
        <title>Play game - Hyperline</title>
      </Head>
      <main className={scss.container}>
        <section className={clsx(scss.board, scss[`b${gridSize}x${gridSize}`])}>
          {board.map((v, i) => (
            <div key={i.toString()} onClick={() => markSquare(i)}>
              {renderSquare(i)}
            </div>
          ))}
        </section>
        <section className={scss.meta}>
          <header className={clsx(scss.header, "txt-xl header")}>HYPERLINE</header>
          <div className={scss.status}>
            {!winner && (
              <>
                {turn === "p1" && <TicTacLoader className={clsx(scss.loader, scss.x)} />}
                <div className={clsx("txt-lg", scss.player)}>{session.p1?.name ?? ""}</div>
                <BoltSvg />
                <div className={clsx("txt-lg", scss.player)}>{session.p2?.name ?? ""}</div>
                {turn === "p2" && <TicTacLoader className={clsx(scss.loader, scss.o)} />}
              </>
            )}
            {(winner === "p1" || winner === "p2") && (
              <>
                <IconTrophy size={48} />
                <div className="txt-lg">{session[winner]?.name ?? ""} wins!</div>
              </>
            )}
            {winner === "none" && <div className="txt-lg">draw 🤝</div>}
            {!!winner && (
              <Button variant="light" onClick={emitPlayAgain}>
                Play again?
              </Button>
            )}
          </div>
          <div className={scss.options}>
            <h4>Grid size</h4>
            <Chip.Group multiple={false} value={gridSize} onChange={setGridSize}>
              <Chip value="3" variant="filled" radius="sm">
                3 ✖ 3
              </Chip>
              <Chip value="5" variant="filled" radius="sm">
                5 ✖ 5
              </Chip>
              <Chip value="7" variant="filled" radius="sm">
                7 ✖ 7
              </Chip>
            </Chip.Group>
          </div>
        </section>
      </main>
    </>
  );
};

export default PlayPage;
