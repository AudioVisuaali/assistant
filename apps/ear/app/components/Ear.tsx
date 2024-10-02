import "regenerator-runtime/runtime";
import { useEffect } from "react";
import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";
import { useSendMessage } from "~/providers/SocketIOProvider";

export const Ear = () => {
	const { sendMessage } = useSendMessage();
	const {
		transcript,
		finalTranscript,
		interimTranscript,
		listening,
		resetTranscript,
		browserSupportsSpeechRecognition,
	} = useSpeechRecognition();

	if (!browserSupportsSpeechRecognition) {
		return <span>Browser doesn't support speech recognition.</span>;
	}

	useEffect(() => {
		if (finalTranscript) {
			sendMessage(finalTranscript);
		}
		resetTranscript();
	}, [finalTranscript, resetTranscript, sendMessage]);

	return (
		<div>
			<p>Microphone: {listening ? "on" : "off"}</p>
			<button
				type="button"
				onClick={() => SpeechRecognition.startListening({ continuous: true })}
			>
				Start
			</button>
			<button type="button" onClick={SpeechRecognition.stopListening}>
				Stop
			</button>
			<button type="button" onClick={resetTranscript}>
				Reset
			</button>

			<p>{transcript}</p>
			<hr />
			<p>{finalTranscript}</p>
			<hr />
			<p>{interimTranscript}</p>
		</div>
	);
};
