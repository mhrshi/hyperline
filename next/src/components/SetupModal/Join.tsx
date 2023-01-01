import { FormEvent, useCallback, useContext, useEffect, useState } from "react";
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

  const validate = useCallback(() => {
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
  }, [sessionId]);

  useEffect(() => {
    if (isMount) return;
    validate();
  }, [sessionId, validate, isMount]);

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    if (errors.sessionId) return;
    setLoading(true);
    socket.emit("game:join", { gamerName, roomId: sessionId });

    socket.on("game:joined", (body) => {
      if (!body.success) {
        setLoading(false);
        setErrors((prev) => ({ ...prev, sessionId: "Session not found" }));
        return;
      }
      setSession({
        id: sessionId,
        p1: { name: body.p1 },
        p2: { name: body.p2 },
        iAm: "p2",
        firstMover: "p1",
      });
      router.push("/play");
    });
  };

  return (
    <>
      <p className={scss.tip}>Enter session ID shared by your friend</p>
      <form onSubmit={onSubmit}>
        <TextInput
          size="md"
          label="Session ID"
          value={sessionId}
          onChange={setSessionId}
          error={errors.sessionId}
          disabled={isLoading}
        />
        <Button type="submit" loaderPosition="right" loading={isLoading}>
          NEXT
        </Button>
      </form>
    </>
  );
};

export default Join;
