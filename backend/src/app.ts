import "dotenv/config";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import "./env";
import { sampleRouter } from "./routes/sample";
import { contactRouter } from "./routes/contact";

const app = new Hono();

const corsOriginEnv = process.env.CORS_ORIGIN ?? "http://localhost:8000";
const allowedOrigins = corsOriginEnv.split(",").map((s) => s.trim()).filter(Boolean);

app.use(
  "*",
  cors({
    origin: (origin) => {
      if (!origin) return null;
      if (allowedOrigins.includes("*")) return origin;
      return allowedOrigins.includes(origin) ? origin : null;
    },
    credentials: true,
  })
);

app.use("*", logger());

app.get("/health", (c) => c.json({ status: "ok" }));

app.route("/api/sample", sampleRouter);
app.route("/api/contact", contactRouter);

export { app };
export default app;
