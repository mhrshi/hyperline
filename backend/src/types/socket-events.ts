import type * as Game from "./game.js";

export interface ClientToServerEvents {
  "game:host": (body: Game.GameHostBody) => void;
  "game:join": (body: Game.GameJoinBody) => void;
  "game:reset": (body: Game.GameResetBody) => void;

  "player:mark": (body: Game.PlayerMarkBody) => void;
}

export interface ServerToClientEvents {
  "game:hosted": (body: Game.GameHostedBody) => void;
  "game:joined": (body: Game.GameJoinedBody) => void;
  "game:sync": (body: Game.GameSyncBody) => void;
  "game:reset": (body: Game.GameResetBody) => void;
  "game:left": () => void;

  "player:marked": (body: Game.PlayerMarkedBody) => void;
}
