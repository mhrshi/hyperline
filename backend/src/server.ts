import * as path from "path";
import { fileURLToPath } from "url";
import { fastify as Fastify } from "fastify";
import cors from "@fastify/cors";
import compress from "@fastify/compress";
import helmet from "@fastify/helmet";
import fastifyStatic from "@fastify/static";

import socketPlugin from "./socket/index.js";
import { corsOrigin } from "./globals.js";

import gameHandler from "./socket/game-handler.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const fastify = Fastify({ logger: true });
fastify.setErrorHandler(async (err, _req, _res) => {
  console.error("---- Error caught by fastify ----");
  console.error(err);
  console.error("---- x ----");
});

fastify.register(cors, { origin: corsOrigin });
fastify.register(compress);
fastify.register(helmet);
fastify.register(fastifyStatic, { root: path.join(__dirname, "..", "..", "next", "out") });
fastify.register(socketPlugin);

fastify.ready().then(() => {
  fastify.io.on("connection", (socket) => {
    gameHandler(fastify.io, socket);
  });
});

fastify.setNotFoundHandler(async (req, res) => {
  await res.sendFile("index.html");
});

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 5000;
    const address = await fastify.listen({ host: "0.0.0.0", port });
    console.log(`Hyperline server listening at ${address}`);
  } catch (err) {
    console.error(`---- Error caught in fastify.listen ----`);
    console.error(err);
    console.error("---- x ----");
  }
};
start();
