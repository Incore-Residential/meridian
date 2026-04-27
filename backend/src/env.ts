import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().optional().default("3000"),
  NODE_ENV: z.string().optional(),
  CORS_ORIGIN: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  CONTACT_FROM_EMAIL: z.string().optional(),
  CONTACT_TO_EMAIL: z.string().optional(),
});

function validateEnv() {
  try {
    const parsed = envSchema.parse(process.env);
    console.log("Environment variables validated");
    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Environment variable validation failed:");
      for (const err of error.issues) {
        console.error(`  - ${err.path.join(".")}: ${err.message}`);
      }
      console.error("\nCheck your .env file and make sure required variables are set.");
      process.exit(1);
    }
    throw error;
  }
}

export const env = validateEnv();

export type Env = z.infer<typeof envSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
