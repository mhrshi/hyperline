import { IS_PRODUCTION } from "./utils.js";

export const corsOrigin = IS_PRODUCTION ? process.env.NEXT_PUBLIC_SOCKET_DOMAIN : true;
