import { useState } from "react";
import Head from "next/head";

import scss from "@styles/pages/setup.module.scss";
import SetupModal, { SetupAction } from "@components/SetupModal";
import HostSvg from "@svg/Host";
import JoinSvg from "@svg/Join";

type ModalConfig = { opened: boolean; action: SetupAction };

const SetupPage = () => {
  const [modalConfig, setModalConfig] = useState<ModalConfig>({ opened: false, action: "HOST" });

  const openModalToHost = () => setModalConfig({ opened: true, action: "HOST" });
  const openModalToJoin = () => setModalConfig({ opened: true, action: "JOIN" });
  const closeModal = () => setModalConfig(({ action }) => ({ opened: false, action }));

  return (
    <>
      <Head>
        <title>Hyperline</title>
      </Head>
      <main className={scss.container}>
        <section className={scss.info}>
          <header className="txt-xl header">HYPERLINE</header>
          <div>
            <p className="font-italic txt-lg txt-center">&ldquo;Line. Not the usual one.&rdquo;</p>
          </div>
          <div>
            <p>
              A generalized tic-tac-toe game with 3 grid sizes and 2 variants to play. The goal is
              to create a hyperline spanning across a row, column, or any of the 2 diagonals.
            </p>
          </div>
          <div>
            <h4>Levels/Grids</h4>
            <p>
              <span>-&gt;&nbsp;&nbsp;3 ✖ 3 (three-in-a-line)</span>
              <br />
              <span>-&gt;&nbsp;&nbsp;5 ✖ 5 (four-in-a-line)</span>
              <br />
              <span>-&gt;&nbsp;&nbsp;7 ✖ 7 (four-in-a-line)</span>
            </p>
          </div>
          <div>
            <h4 className="font-bold">Variants</h4>
            <p>
              <span>-&gt;&nbsp;&nbsp;Standard</span>
              <br />
              <span>
                The normal tic-tac-toe. Two players, X & O take turns in marking the places. First
                to create a hyperline wins.
              </span>
            </p>
            {/* <p>
              <span>-&gt;&nbsp;&nbsp;Numeric</span>
              <br />
              <span>
                Two players, one plays with odd numbers, other with even. For a given grid, numbers
                from 1 to X are used. First to create a hyperline summing upto Y wins.
              </span>
            </p> */}
          </div>
        </section>
        <section className={scss.actions}>
          <header className="txt-xl header">Setup</header>
          <button onClick={openModalToHost}>
            <HostSvg />
            <span className="font-italic">Host a new game&nbsp;-&gt;</span>
          </button>
          <button onClick={openModalToJoin}>
            <JoinSvg />
            <span className="font-italic">Join game hosted by your friend&nbsp;-&gt;</span>
          </button>
          <SetupModal {...modalConfig} onClose={closeModal} />
        </section>
      </main>
    </>
  );
};

export default SetupPage;
