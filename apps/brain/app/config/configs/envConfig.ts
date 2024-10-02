import { getEnvInt } from "../envNames";

export type ConfigEnv = {
	port: number;
};

export function createConfigEnv(): ConfigEnv {
	return {
		port: getEnvInt("PORT"),
	};
}
