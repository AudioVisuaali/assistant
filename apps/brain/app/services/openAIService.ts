import { type Try, toFailure, toSuccess } from "../Try";
import type { ConfigOpenAI } from "../config/configs/openAIConfig";

export async function openAICompletion(
	prompt: string,
	config: ConfigOpenAI,
): Promise<Try<string, Error>> {
	if (!prompt) {
		return toSuccess("");
	}

	try {
		const response = await fetch("https://api.openai.com/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${config.apiKey}`,
			},
			body: JSON.stringify({
				model: "gpt-4o-mini",
				messages: [
					{
						role: "system",
						content:
							"You will be provided a sentence or a snippet of a conversation, addressed to you. Your purpose is to deduce what you are being asked, however you may only respond with one of these single-word options: drink, go away, hug. If the sentence provided doesn't fit any of the options, answer 'pass'.",
					},
					{
						role: "user",
						content: prompt,
					},
				],
				temperature: 0.3,
			}),
		});
		const json = (await response.json()) as {
			choices: { message: { content: string } }[];
		};
		const commandWord = json.choices[0].message.content;
		return toSuccess(commandWord);
	} catch (error) {
		return toFailure(error as Error);
	}
}
