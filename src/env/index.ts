import { z } from "zod";
import "dotenv/config";

const envSetupSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(["dev", "production"]),
  JWT_SECRET: z.string(),
});

const _env = envSetupSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("⚠️ Invalid environment variables", _env.error.format());

  throw new Error("Invalid environment variables.");
}

export const env = _env.data;
