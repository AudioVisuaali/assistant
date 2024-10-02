export function requireString(name: string): string {
	return requireValue(name);
}

function requireValue(name: string): string {
	const value = (window as unknown as WindowWithEnv).ENV[name];

	if (typeof value !== "string") {
		throw new Error(`Environment variable ${name} is not defined`);
	}

	return value;
}

type WindowWithEnv = {
	ENV: Record<string, unknown>;
};

type ConfigClient = {
	wsEndpoint: string;
};

let configClient: ConfigClient | null = null;

export function getConfigClient(): ConfigClient {
	if (!configClient) {
		configClient = createConfigClient();
	}

	return configClient;
}

function createConfigClient(): ConfigClient {
	return {
		wsEndpoint: requireString("WS_ENDPOINT"),
	};
}
