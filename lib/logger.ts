// Logger is created to be used with NextJS SSR components to print log in JSON format so that Grafana/Loki
// can parse it correctly.

interface ILogger {
    error: (message: string, details?: object) => void;
    // Add other log levels as needed, e.g., info, debug, warn
}

class JsonLogger implements ILogger {
    error(message: string, details: object = {}): void {
        console.error(JSON.stringify({ level: "error", message, ...details }));
    }

    warn(message: string, details: object = {}): void {
        console.warn(JSON.stringify({ level: "warn", message, ...details }));
    }

    debug(message: string, details: unknown = {}): void {
        console.debug(JSON.stringify({ level: "debug", message, details }));
    }

    info(message: string, details: object = {}): void {
        console.info(JSON.stringify({ level: "info", message, ...details }));
    }
}

const logger = new JsonLogger();

export default logger;
