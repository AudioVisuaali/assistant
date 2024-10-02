import type { MetaFunction } from "@remix-run/node";
import { ClientSide } from "~/components/ClientSide";
import { Ear } from "~/components/Ear";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Index() {
	return (
		<ClientSide>
			<Ear />
		</ClientSide>
	);
}
