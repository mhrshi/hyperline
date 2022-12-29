import { useContext, useEffect, useState } from "react";
import { Modal } from "@mantine/core";

import scss from "./SetupModal.module.scss";
import GamerName from "./GamerName";
import Hosted from "./Hosted";
import { SessionContext } from "@context/Session";
import { SocketContext } from "@context/Socket";
import Join from "./Join";

export type SetupAction = "HOST" | "JOIN";

interface Props {
  action: SetupAction;
  opened: boolean;
  onClose: () => void;
}

const SetupModal = ({ action, opened, onClose }: Props) => {
  const socket = useContext(SocketContext);
  const [session, setSession] = useContext(SessionContext);
  const [gamerName, setGamerName] = useState("");

  const wannaHost = action === "HOST";

  const submitName = (name: string) => {
    setGamerName(name);
  };

  useEffect(() => {
    const onSessionAssigned = (roomId: string) => {
      setSession({ id: roomId, p1: { name: gamerName }, iAm: "p1", firstMover: "p1" });
    };

    if (!gamerName) return;
    if (wannaHost) {
      socket.emit("newHost", gamerName);
      socket.on("sessionAssigned", onSessionAssigned);
    }

    return () => {
      socket.off("sessionAssigned", onSessionAssigned);
    };
  }, [gamerName, wannaHost, socket, setSession]);

  const title = wannaHost ? "Host a new game" : "Join game";
  const firstPlayerOnly = !session?.p2;

  return (
    <Modal
      centered
      closeOnClickOutside={false}
      closeOnEscape={false}
      opened={opened}
      onClose={onClose}
      title={title}
    >
      <div className={scss.container}>
        {!session && !gamerName && <GamerName submitName={submitName} />}
        {wannaHost && !!session && firstPlayerOnly && <Hosted session={session} />}
        {!wannaHost && !!gamerName && <Join gamerName={gamerName} />}
      </div>
    </Modal>
  );
};

export default SetupModal;
