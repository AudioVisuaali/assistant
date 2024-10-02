import { getEnv } from "../envNames";

export type ConfigOpenAI = {
	apiKey: string;
};

export function createConfigOpenAI(): ConfigOpenAI {
	return {
		apiKey: getEnv("OPENAI_API_KEY"),
	};
}
