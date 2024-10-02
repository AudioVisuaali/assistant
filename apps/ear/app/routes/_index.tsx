import type { MetaFunction } from "@remix-run/node";
import { ClientSide } from "~/components/ClientSide";
import { Ear } from "~/components/Ear";
import { SocketIOProvder } from "~/providers/SocketIOProvider";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Index() {
	return (
		<ClientSide>
			<SocketIOProvder>
				<Ear />
			</SocketIOProvder>
		</ClientSide>
	);
}
