import { createConfig } from "./config/config";
import { createServer } from "./server";

const config = createConfig();

const startServer = createServer({ config });

startServer();
