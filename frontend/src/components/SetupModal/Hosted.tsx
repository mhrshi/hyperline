import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { ActionIcon, Tooltip } from "@mantine/core";
import { IconClipboard, IconClipboardCheck } from "@tabler/icons";
import { useClipboard } from "@mantine/hooks";

import scss from "./SetupModal.module.scss";
import TicTacLoader from "@components/TicTacLoader";
import { SocketContext } from "@context/Socket";
import { SessionContext } from "@context/Session";
import { clsx } from "utils";

import type { GameJoinedBody } from "@backend-shared-types/game";

const Hosted = () => {
  const router = useRouter();
  const clipboard = useClipboard();
  const socket = useContext(SocketContext);
  const [session, setSession] = useContext(SessionContext);

  useEffect(() => {
    const onOpponentGameJoined = (body: GameJoinedBody) => {
      if (!body.success) return;
      setSession({
        id: session!.id,
        p1: body.p1,
        p2: body.p2,
        iAm: "p1",
        firstMover: "p1",
      });
      router.push("/play");
    };
    socket.on("game:joined", onOpponentGameJoined);

    return () => {
      socket.off("game:joined", onOpponentGameJoined);
    };
  }, [router, socket, session, setSession]);

  return (
    <>
      <p className={scss.tip}>
        Your friend can use this session ID to join.
        <br />
        Waiting...
      </p>
      <div className={clsx("txt-lg", scss.sessionId)}>
        {session!.id}
        <Tooltip
          withArrow
          position="top"
          events={{ hover: true, touch: true, focus: false }}
          label={clipboard.error ? "couldn't copy :(" : clipboard.copied ? "copied" : "copy"}
        >
          <ActionIcon
            color={clipboard.copied ? "teal.6" : "gray.6"}
            onClick={() => clipboard.copy(session!.id)}
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
