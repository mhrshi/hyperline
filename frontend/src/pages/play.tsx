import { MouseEvent, useCallback, useContext, useEffect, useState } from "react";
import Head from "next/head";
import { Button, Chip } from "@mantine/core";
import { IconCircle, IconTrophy, IconX } from "@tabler/icons";
import { useRouter } from "next/router";

import scss from "@styles/pages/play.module.scss";
import Splash from "@components/Splash";
import TicTacLoader from "@components/TicTacLoader";
import BoltSvg from "@svg/Bolt";
import { SocketContext } from "@context/Socket";
import { SessionContext } from "@context/Session";
import { clsx, locusToSet } from "utils";

import type {
  Board,
  GameResetBody,
  GameSyncBody,
  Locus,
  PlayerMarkedBody,
  Players,
  Winner,
} from "@backend-shared-types/game";

const markerOf = (player: Players) => Number(player.at(-1));
const otherPlayer = (curr: Players) => (curr === "p1" ? "p2" : "p1");

const PlayPage = () => {
  const router = useRouter();
  const socket = useContext(SocketContext);
  const [session, setSession] = useContext(SessionContext);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (!session) {
      timer = setTimeout(() => {
        router.push("/setup");
      }, 1500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [session, router]);

  const [gridSize, setGridSize] = useState(3);
  const [board, setBoard] = useState<Board>(Array(3).fill([0, 0, 0]));
  const [turn, setTurn] = useState(session?.firstMover ?? "p1");
  const [winner, setWinner] = useState<Winner>();
  const [wonLocus, setWonLocus] = useState(new Set<string>());

  const resetGrid = (size: number) => {
    setGridSize(size);
    setBoard(Array(size).fill(Array(size).fill(0)));
  };

  const resetGame = useCallback(
    (size: number) => {
      resetGrid(size);
      const other = otherPlayer(session!.firstMover);
      setTurn(other);
      setSession({ ...session!, firstMover: other });
      setWinner(undefined);
      setWonLocus(new Set());
    },
    [session, setSession]
  );

  const emitGameReset = (evt?: MouseEvent, newSize?: number) => {
    socket.emit("game:reset", { gridSize: newSize ?? gridSize });
  };

  const onChangeGrid = (newSizeString: string) => {
    const newSize = Number(newSizeString);
    if (newSize === gridSize) return;
    emitGameReset(undefined, newSize);
  };

  useEffect(() => {
    const onOpponentMarked = ({ nextTurn, updatedBoard, winner, wonLocus }: PlayerMarkedBody) => {
      setTurn(nextTurn);
      setBoard(updatedBoard);
      if (winner) {
        setWinner(winner);
        if (wonLocus) {
          setWonLocus(locusToSet(wonLocus));
        }
      }
    };
    socket.on("player:marked", onOpponentMarked);

    const onGameSync = ({ nextTurn, board, winner, wonLocus }: GameSyncBody) => {
      setGridSize(board.length);
      setTurn(nextTurn);
      setBoard(board);
      if (winner) {
        setWinner(winner);
        if (wonLocus) {
          setWonLocus(locusToSet(wonLocus));
        }
      }
    };
    socket.on("game:sync", onGameSync);

    const onGameReset = ({ gridSize }: GameResetBody) => {
      resetGame(gridSize);
    };
    socket.on("game:reset", onGameReset);

    const abortGame = () => {
      setSession(undefined);
      window.location.reload();
    };
    socket.on("game:left", abortGame);

    return () => {
      socket.off("player:marked", onOpponentMarked);
      socket.off("game:sync", onGameSync);
      socket.off("game:reset", onGameReset);
      socket.off("game:left", abortGame);
    };
  }, [resetGame, session, setSession, socket]);

  const markSquare = ([x, y]: Locus) => {
    if (turn !== session!.iAm || board[x][y] || winner) {
      return;
    }
    const mark = markerOf(turn);
    setTurn((curr) => otherPlayer(curr));
    const updatedBoard = board.map((row, r) => {
      if (r !== x) return row;
      return row.map((c, j) => (j === y ? mark : c));
    });
    setBoard(updatedBoard);
    socket.emit("player:mark", { locus: [x, y], updatedBoard });
  };

  const renderSquare = ([x, y]: Locus) => {
    const shouldDim = winner === "none" || (winner && !wonLocus.has(`${x}${y}`));
    const className = clsx(scss.sq, shouldDim && scss.dim);
    return (
      <div key={`${x}${y}`} onClick={() => markSquare([x, y])} className={className}>
        {board[x][y] === 0 ? null : board[x][y] === 1 ? <IconX /> : <IconCircle />}
      </div>
    );
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
          {board.flatMap((row, r) => {
            return row.map((_, c) => renderSquare([r, c]));
          })}
          <div className={clsx(scss.shadow, scss.rows)}>
            {[...Array(gridSize)].map((_, i) => (
              <div key={`h${i}`} />
            ))}
          </div>
          <div className={clsx(scss.shadow, scss.cols)}>
            {[...Array(gridSize)].map((_, i) => (
              <div key={`h${i}`} />
            ))}
          </div>
        </section>
        <section className={scss.meta}>
          <header className={clsx(scss.header, "txt-xl header")}>HYPERLINE</header>
          <div className={scss.status}>
            {!winner && (
              <>
                {turn === "p1" && <TicTacLoader className={clsx(scss.loader, scss.x)} />}
                <div className={clsx("txt-lg", scss.player)}>{session.p1 ?? ""}</div>
                <BoltSvg />
                <div className={clsx("txt-lg", scss.player)}>{session.p2 ?? ""}</div>
                {turn === "p2" && <TicTacLoader className={clsx(scss.loader, scss.o)} />}
              </>
            )}
            {(winner === "p1" || winner === "p2") && (
              <>
                <IconTrophy size={48} />
                <div className="txt-lg">{session[winner] ?? ""} wins!</div>
              </>
            )}
            {winner === "none" && <div className="txt-lg">draw 🤝</div>}
            {!!winner && (
              <Button variant="light" onClick={emitGameReset}>
                Play again?
              </Button>
            )}
          </div>
          <div className={scss.options}>
            <h4>Grid size</h4>
            <Chip.Group multiple={false} value={gridSize.toString()} onChange={onChangeGrid}>
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
