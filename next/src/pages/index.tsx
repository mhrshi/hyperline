import { useEffect } from "react";
import { useRouter } from "next/router";
import Splash from "@components/Splash";

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/setup");
    }, 1500);
  }, [router]);

  return <Splash />;
};

export default IndexPage;
