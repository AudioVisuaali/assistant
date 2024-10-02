import { type ReactNode, useRef, useState } from "react";
import { io } from "socket.io-client";
import { getConfigClient } from "~/config/configClient";

type Props = {
	children: ReactNode;
};

export function SocketIOProvder({ children }: Props) {
	const [config] = useState(getConfigClient());
	const [connected, setConnected] = useState(false);
	const ioRef = useRef(createSocketIO(config.wsEndpoint));

	return children;
}

function createSocketIO(domain: string) {
	const url = `ws://${domain}/`;
	return io(url, { reconnectionDelayMax: 10000, transports: ["websocket"] });
}
