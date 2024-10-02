import fs from "node:fs";
import { DateTime, type Zone } from "luxon";

const printError = (message: string): void => {
	const error = new Error(
		`${message}\n\nFix invalid environment variable and restart the application\n`,
	);
	// biome-ignore lint/suspicious/noConsole: Needed
	console.error(error);
};

export const getEnv = <T extends string>(
	envKey: string,
	allowedValues?: readonly T[],
): T => {
	const value = process.env[envKey];

	if (allowedValues) {
		if (allowedValues.includes((value ?? "") as T)) {
			return (value ?? "") as T;
		}
	}

	if (value) {
		return value as T;
	}

	if (allowedValues) {
		printError(
			`Environment variable ${envKey} is not set, accepted values: ${allowedValues
				.map((value) => `"${value}"`)
				.join(", ")}`,
		);
		process.exit(1);
	}

	printError(`Environment variable ${envKey} is not set`);
	process.exit(1);
};

export const getEnvInt = (envKey: string): number => {
	const value = getEnv(envKey);

	const integerRegex = /^\d+$/;

	if (!integerRegex.test(value)) {
		printError(
			`Environment variable ${envKey}. Received invalid value for INT: ${value}`,
		);
		process.exit(1);
	}

	return Number.parseInt(value, 10);
};

export const getEnvBool = (envKey: string): boolean => {
	const value = getEnv(envKey);

	if (value === "TRUE") {
		return true;
	}

	if (value === "FALSE") {
		return false;
	}

	printError(
		`Environment variable ${envKey}. Accepted values: 'TRUE' or 'FALSE' Received invalid value for BOOLEAN: ${value}`,
	);
	process.exit(1);
};

export const getEnvList = (envKey: string, separator = ","): string[] => {
	const value = getEnv(envKey);

	const items = value.split(separator);

	const emptyItems = items.some((item) => !item);
	if (!emptyItems) {
		return items;
	}

	printError(
		`Environment variable ${envKey}. Received empty list value with separator: "${separator}"`,
	);
	process.exit(1);
};

export const getEnvFallback = (envKey: string, fallback: string): string => {
	const value = process.env[envKey];

	if (!value) {
		return fallback;
	}

	return value;
};

export const getEnvIntFallback = (envKey: string, fallback: number): number => {
	const value = process.env[envKey];

	if (!value) {
		return fallback;
	}

	const parsed = Number.parseInt(value, 10);

	if (Number.isNaN(parsed)) {
		printError(
			`Environment variable ${envKey}. Received invalid value for INT: ${value}`,
		);
		process.exit(1);
	}

	return parsed;
};

export const getTimezone = (envKey: string, fallback?: string): Zone => {
	const value = process.env[envKey];

	const timezone = value ?? fallback;

	if (!timezone) {
		printError(`Environment variable ${envKey} is not set.`);
		process.exit(1);
	}

	const dateTime = DateTime.utc().setZone(timezone);

	if (dateTime.invalidExplanation) {
		printError(
			`Environment variable ${envKey}. ${dateTime.invalidExplanation}`,
		);
		process.exit(1);
	}

	return dateTime.zone;
};

type Package = {
	name: string;
	version: string;
};

export const getEnvPackageJSON = (): Package => {
	try {
		return JSON.parse(fs.readFileSync("package.json", "utf8")) as Package;
	} catch (e) {
		printError(
			"'package.json' was not found. 'package.json' is needed in the root directory.",
		);
		process.exit(1);
	}
};
