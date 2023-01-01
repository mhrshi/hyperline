import fastifyPlugin from "fastify-plugin";
import { Server } from "socket.io";

import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import type { ClientToServerEvents, ServerToClientEvents } from "../types/socket-events.js";

const socketPlugin = async (fastify: FastifyInstance, _opts: FastifyPluginOptions) => {
  const io = new Server<ClientToServerEvents, ServerToClientEvents>(fastify.server, {
    path: "/ws/",
    cors: { origin: true, credentials: true },
  });
  fastify.decorate("io", io);
  fastify.addHook("onClose", async (fastify) => {
    fastify.io.close();
  });
};

export default fastifyPlugin(socketPlugin);
