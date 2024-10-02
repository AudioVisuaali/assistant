export function requireString(name: string): string {
	return requireValue(name);
}

function requireValue(name: string): string {
	const value = process.env[name];

	if (typeof value !== "string") {
		throw new Error(`Environment variable ${name} is not defined`);
	}

	return value;
}

type ConfigServer = {
	wsEndpoint: string;
};

let configServer: ConfigServer | null = null;

export function getConfigServer(): ConfigServer {
	if (!configServer) {
		configServer = createConfigServer();
	}

	return configServer;
}

function createConfigServer(): ConfigServer {
	return {
		wsEndpoint: requireString("WS_ENDPOINT"),
	};
}
