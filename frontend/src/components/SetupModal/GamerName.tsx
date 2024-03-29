import { FormEvent, useCallback, useEffect, useState } from "react";
import { Button, TextInput } from "@mantine/core";
import { useInputState } from "@mantine/hooks";

import scss from "./SetupModal.module.scss";
import useIsMount from "@hooks/useIsMount";

interface Props {
  submitName: (name: string) => void;
}

const GamerName = ({ submitName }: Props) => {
  const isMount = useIsMount();
  const [name, setName] = useInputState("");
  const [errors, setErrors] = useState({ name: "" });
  const [isLoading, setLoading] = useState(false);

  const validateName = useCallback(() => {
    const gamerName = name.trim();
    if (gamerName.length === 0) {
      setErrors((prev) => ({ ...prev, name: "Cannot be empty" }));
      return;
    }
    if (gamerName.length < 3) {
      setErrors((prev) => ({ ...prev, name: "Should have at least 3 letters" }));
      return;
    }
    if (gamerName.length > 9) {
      setErrors((prev) => ({ ...prev, name: "Should not exceed 9 letters" }));
      return;
    }
    if (!/^\w+$/.test(gamerName)) {
      setErrors((prev) => ({
        ...prev,
        name: "Should have only letters, digits or underscore",
      }));
      return;
    }
    setErrors((prev) => ({ ...prev, name: "" }));
  }, [name]);

  useEffect(() => {
    if (isMount) return;
    validateName();
  }, [name, isMount, validateName]);

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    if (errors.name) return;
    setLoading(true);
    submitName(name);
  };

  return (
    <>
      <p className={scss.tip}>How would you like to identify yourself?</p>
      <form onSubmit={onSubmit}>
        <TextInput
          size="md"
          label="Gamer name"
          value={name}
          onChange={setName}
          error={errors.name}
          disabled={isLoading}
        />
        <Button type="submit" loaderPosition="right" loading={isLoading}>
          NEXT
        </Button>
      </form>
    </>
  );
};

export default GamerName;
