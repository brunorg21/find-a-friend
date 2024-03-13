import fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import { env } from "./env";
import { fastifyJwt } from "@fastify/jwt";
import { organizationRoutes } from "./controllers/organizations/route";

const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,

  sign: {
    expiresIn: "20m",
  },
});

app.register(fastifyCookie);

app.register(organizationRoutes);

app
  .listen({
    port: env.PORT,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("Http server running");
  });
