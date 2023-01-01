import scss from "./Splash.module.scss";
import TicTacLoader from "@components/TicTacLoader";

const Splash = () => {
  return (
    <main className={scss.container}>
      <TicTacLoader />
    </main>
  );
};

export default Splash;
