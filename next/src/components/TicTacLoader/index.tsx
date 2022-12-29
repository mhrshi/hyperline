import { SVGProps } from "react";
import scss from "./Loader.module.scss";
import { clsx } from "utils";

const TicTacLoader = (props: SVGProps<SVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={clsx("icon icon-tabler icon-tabler-tic-tac", props.className)}
    width={24}
    height={24}
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <circle cx={6} cy={6} r={2} className={scss.o}></circle>
    <path d="M3 12h18" className={scss.l}></path>
    <path d="M12 3v18" className={scss.l}></path>
    <path d="M4 16l4 4" className={scss.x}></path>
    <path d="M4 20l4 -4" className={scss.x}></path>
    <path d="M16 4l4 4" className={scss.x}></path>
    <path d="M16 8l4 -4" className={scss.x}></path>
    <circle cx={18} cy={18} r={2} className={scss.o}></circle>
  </svg>
);

export default TicTacLoader;
