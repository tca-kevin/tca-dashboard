import { defineConfig } from "vite";
import laravel, { refreshPaths } from "laravel-vite-plugin";
import fs from "fs";
import dotenv from "dotenv";

const env = dotenv.config().parsed;

const commonConfig = {
    plugins: [
        laravel({
            input: [
                "resources/sass/app.scss",
                "resources/css/app.css",
                "resources/js/app.js",
            ],
            refresh: [...refreshPaths],
        }),
    ],
};

let config = {};

config = {
    ...commonConfig,
};

if (env?.DEV_ENV === "docker") {
    config = {
        server: {
            host: "0.0.0.0",
            port: 5173,
            hmr: {
                host: env?.APP_HOST,
            },
            https: {
                key: fs.readFileSync(`${env.APP_KEY_DIR}`),
                cert: fs.readFileSync(`${env.APP_CERT_DIR}`),
            },
            watch: {
                usePolling: true,
            },
        },
        ...commonConfig,
    };
} else if (env?.DEV_ENV === "valet") {
    config = {
        server: {
            host: "127.0.0.1",
            port: 5173,
            hmr: {
                host: env?.APP_HOST,
            },
            https: {
                key: fs.readFileSync(`${env.APP_KEY_DIR}`),
                cert: fs.readFileSync(`${env.APP_CERT_DIR}`),
            },
            watch: {
                usePolling: true,
            },
        },
        ...commonConfig,
    };
} else {
    config = {
        ...commonConfig,
    };
}

export default defineConfig(config);
