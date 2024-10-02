import { type ReactElement, type ReactNode, useEffect, useRef } from "react";

type Props = {
	children: ReactNode;
};

export function SpeechRecognition(props: Props): ReactElement {
	const [isListening, setIsListening] = useState(false);
	const [transcript, setTranscript] = useState("");
	const recognitionRef = useRef(null);

	useEffect(() => {
		if (!("SpeechRecognition" in window)) {
			return;
		}

		const SpeechRecognition = window.SpeechRecognition;
		recognitionRef.current = new SpeechRecognition();
	}, []);
}
