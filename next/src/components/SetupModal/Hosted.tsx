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

interface Props {
  session: Session;
}
interface Payload {
  success: boolean;
  1: string;
  2: string;
}

const Hosted = ({ session }: Props) => {
  const router = useRouter();
  const clipboard = useClipboard();
  const socket = useContext(SocketContext);
  const [, setSession] = useContext(SessionContext);

  useEffect(() => {
    const onPlayerAdded = (payload: Payload) => {
      if (!payload.success) return;
      setSession({
        id: session.id,
        p1: { name: payload[1] },
        p2: { name: payload[2] },
        iAm: "p1",
        firstMover: "p1",
      });
      router.push("/play");
    };

    socket.on("playerAdded", onPlayerAdded);

    return () => {
      socket.off("playerAdded", onPlayerAdded);
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
