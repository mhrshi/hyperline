import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { ActionIcon, CopyButton, Loader, Tooltip } from "@mantine/core";
import { IconClipboard, IconClipboardCheck } from "@tabler/icons";

import scss from "./SetupModal.module.scss";
import { SocketContext } from "@context/Socket";
import { Session, SessionContext } from "@context/Session";

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
      <p className={scss.tip}>Your friend can use this session ID to join. Waiting...</p>
      <div className={scss.session}>
        <div className="txt-lg">
          {session.id}
          <CopyButton value={session.id} timeout={4000}>
            {({ copied, copy }) => (
              <Tooltip label={copied ? "Copied" : "Copy"} position="right" withArrow>
                <ActionIcon color={copied ? "teal.6" : "gray.6"} onClick={copy}>
                  {copied ? <IconClipboardCheck /> : <IconClipboard />}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        </div>
        <Loader size="md" />
      </div>
    </>
  );
};

export default Hosted;
