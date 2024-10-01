if (process.env.NODE_ENV === "development") {
  require("../../mock-api/miragejs/server").makeServer({
    environment: "development",
  });
}
