import fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import { env } from "./env";
import { fastifyJwt } from "@fastify/jwt";
import { organizationRoutes } from "./controllers/organizations/route";
import { ZodError } from "zod";

const app = fastify();

//Library Register
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,

  sign: {
    expiresIn: "20m",
  },
});
app.register(fastifyCookie);

//Routes
app.register(organizationRoutes);

//Error Handling
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error.",
      issues: error.format(),
    });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    //TODO
  }

  return reply.status(500).send({
    message: "Internal server error",
  });
});

app
  .listen({
    port: env.PORT,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("Http server running");
  });
