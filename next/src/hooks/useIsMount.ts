import { useEffect, useRef } from "react";

const useIsMount = () => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  return isFirstRender.current;
};

export default useIsMount;
