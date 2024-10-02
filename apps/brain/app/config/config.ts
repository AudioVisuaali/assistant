import { type ConfigEnv, createConfigEnv } from "./configs/envConfig";
import { type ConfigOpenAI, createConfigOpenAI } from "./configs/openAIConfig";

export type Config = {
	openAI: ConfigOpenAI;
	env: ConfigEnv;
};

export function createConfig() {
	return {
		openAI: createConfigOpenAI(),
		env: createConfigEnv(),
	};
}
