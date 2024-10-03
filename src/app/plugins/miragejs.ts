import { Server } from "miragejs";

export default function init(): Server | undefined {
  if (process.env.NODE_ENV === "development") {
    const server = require("../../mock-api/miragejs/server").makeServer({
      environment: "development",
    });

    return server as Server;
  }
  return undefined;
}

init();
