import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, TextInput } from "@mantine/core";
import { useInputState } from "@mantine/hooks";

import scss from "./SetupModal.module.scss";
import useIsMount from "@hooks/useIsMount";
import { SocketContext } from "@context/Socket";
import { SessionContext } from "@context/Session";

interface Props {
  gamerName: string;
}

const Join = ({ gamerName }: Props) => {
  const router = useRouter();
  const socket = useContext(SocketContext);
  const [, setSession] = useContext(SessionContext);
  const isMount = useIsMount();
  const [sessionId, setSessionId] = useInputState("");
  const [errors, setErrors] = useState({ sessionId: "" });
  const [isLoading, setLoading] = useState(false);

  const validate = () => {
    const value = sessionId.trim();
    if (value.length === 0) {
      setErrors((prev) => ({ ...prev, sessionId: "Cannot be empty" }));
      return;
    }
    if (!/^[\w-]+$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        sessionId: "Should have only letters, digits or underscore",
      }));
      return;
    }
    setErrors((prev) => ({ ...prev, sessionId: "" }));
  };

  useEffect(() => {
    if (isMount) return;
    validate();
  }, [sessionId]);

  const onSubmit = () => {
    if (errors.sessionId) return;
    setLoading(true);
    socket.emit("addPlayer", gamerName, sessionId);
    socket.on("playerAdded", (payload) => {
      if (!payload.success) {
        setLoading(false);
        setErrors((prev) => ({ ...prev, sessionId: "Session not found" }));
        return;
      }
      setSession({
        id: sessionId,
        p1: { name: payload[1] },
        p2: { name: payload[2] },
        iAm: "p2",
        firstMover: "p1",
      });
      router.push("/play");
    });
  };

  return (
    <>
      <p className={scss.tip}>Enter session ID shared by your friend</p>
      <TextInput
        size="md"
        label="Session ID"
        value={sessionId}
        onChange={setSessionId}
        error={errors.sessionId}
        disabled={isLoading}
      />
      <Button onClick={onSubmit} loading={isLoading} loaderPosition="right">
        NEXT
      </Button>
    </>
  );
};

export default Join;
