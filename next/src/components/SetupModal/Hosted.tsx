import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { ActionIcon, Loader, Tooltip, UnstyledButton } from "@mantine/core";
import { IconClipboard, IconClipboardCheck } from "@tabler/icons";
import { useClipboard } from "@mantine/hooks";

import scss from "./SetupModal.module.scss";
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
  }, []);

  return (
    <>
      <p className={scss.tip}>
        Your friend can use this session ID to join.
        <br />
        Waiting&nbsp;&nbsp;
        <Loader variant="dots" />
      </p>
      <div className={clsx("txt-lg", scss.sessionId)}>
        {session.id}
        <UnstyledButton>
          <Tooltip
            withArrow
            position="right"
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
        </UnstyledButton>
      </div>
    </>
  );
};

export default Hosted;
