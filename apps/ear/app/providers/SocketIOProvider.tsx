import { type ReactNode, createContext, useContext, useRef } from "react";
import { io } from "socket.io-client";
import { getConfigClient } from "~/config/configClient";

type Props = {
	children: ReactNode;
};

export function SocketIOProvder({ children }: Props) {
	const config = getConfigClient();

	const ioRef = useRef(createSocketIO(config.wsEndpoint));

	function sendMessage(message: string) {
		ioRef.current.emit("message", message);
	}

	return (
		<SendMessageContext.Provider value={{ sendMessage }}>
			{children}
		</SendMessageContext.Provider>
	);
}

function createSocketIO(domain: string) {
	const url = `ws://${domain}/`;
	return io(url, { reconnectionDelayMax: 10000, transports: ["websocket"] });
}

type SendMessageState = { sendMessage: (message: string) => void };
const SendMessageContext = createContext<SendMessageState | null>(null);

export function useSendMessage(): SendMessageState {
	const value = useContext(SendMessageContext);

	if (!value) {
		throw new Error("useSendMessage used outside Provider");
	}

	return value;
}
