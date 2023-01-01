import type { TypedServer } from "./socket-io.js";

declare module "fastify" {
  export interface FastifyInstance<> {
    io: TypedServer;
  }
}
