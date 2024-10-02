import { type ReactNode, useEffect, useState } from "react";

type Props = {
	children: ReactNode;
};

export function ClientSide({ children }: Props) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return children;
}
