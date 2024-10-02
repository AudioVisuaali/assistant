import { createServer as createServerNode } from "node:http";
import { Server } from "socket.io";
import type { Config } from "./config/config";
import { openAICompletion } from "./services/openAIService";

type Params = {
	config: Config;
};

export function createServer({ config }: Params) {
	const server = createServerNode();
	const io = new Server(server, {
		cors: { origin: "http://localhost:5173" },
	});

	io.on("connection", (socket) => {
		console.log("a user connected");
		socket.on("message", (a) => {
			openAICompletion(a, config.openAI).then(console.log);
		});
	});

	return () => {
		server.listen(config.env.port, () => {
			console.log(`Server listening on port ${config.env.port}`);
		});
	};
}
