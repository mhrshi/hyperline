import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { ActionIcon, Tooltip } from "@mantine/core";
import { IconClipboard, IconClipboardCheck } from "@tabler/icons";
import { useClipboard } from "@mantine/hooks";

import scss from "./SetupModal.module.scss";
import TicTacLoader from "@components/TicTacLoader";
import { SocketContext } from "@context/Socket";
import { Session, SessionContext } from "@context/Session";
import { clsx } from "utils";

import type { GameJoinedBody } from "@backend-shared-types/game";

interface Props {
  session: Session;
}

const Hosted = ({ session }: Props) => {
  const router = useRouter();
  const clipboard = useClipboard();
  const socket = useContext(SocketContext);
  const [, setSession] = useContext(SessionContext);

  useEffect(() => {
    const onOpponentGameJoined = (body: GameJoinedBody) => {
      if (!body.success) return;
      setSession({
        id: session.id,
        p1: { name: body.p1 },
        p2: { name: body.p2 },
        iAm: "p1",
        firstMover: "p1",
      });
      router.push("/play");
    };
    socket.on("game:joined", onOpponentGameJoined);

    return () => {
      socket.off("game:joined", onOpponentGameJoined);
    };
  }, [router, socket, session.id, setSession]);

  return (
    <>
      <p className={scss.tip}>
        Your friend can use this session ID to join.
        <br />
        Waiting...
      </p>
      <div className={clsx("txt-lg", scss.sessionId)}>
        {session.id}
        <Tooltip
          withArrow
          position="top"
          events={{ hover: true, touch: true, focus: false }}
          label={clipboard.error ? "couldn't copy :(" : clipboard.copied ? "copied" : "copy"}
        >
          <ActionIcon
            color={clipboard.copied ? "teal.6" : "gray.6"}
            onClick={() => clipboard.copy(session.id)}
          >
            {clipboard.copied ? <IconClipboardCheck /> : <IconClipboard />}
          </ActionIcon>
        </Tooltip>
        <TicTacLoader />
      </div>
    </>
  );
};

export default Hosted;
