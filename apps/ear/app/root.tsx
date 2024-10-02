import type { LinksFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";
import type { ReactNode } from "react";
import { getConfigServer } from "./config/configServer";

export const links: LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
];

export async function loader() {
	const config = getConfigServer();

	return {
		env: {
			WS_ENDPOINT: config.wsEndpoint,
		},
	};
}

export function Layout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	const { env } = useLoaderData<typeof loader>();

	return (
		<>
			<Outlet />

			<script
				// biome-ignore lint/security/noDangerouslySetInnerHtml: Pass shared environment variables to client.
				dangerouslySetInnerHTML={{
					__html: `window.ENV = ${JSON.stringify(env)}`,
				}}
			/>
		</>
	);
}
