import { createServer as createServerNode } from "node:http";
import { Server } from "socket.io";
import type { Config } from "./config/config";

type Params = {
	config: Config;
};

export function createServer({ config }: Params) {
	const server = createServerNode();
	const io = new Server(server);

	io.on("connection", () => {
		console.log("a user connected");
	});

	return () => {
		server.listen(config.env.port, () => {
			console.log(`Server listening on port ${config.env.port}`);
		});
	};
}
