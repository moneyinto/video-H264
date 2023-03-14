import { defineConfig, UserConfig } from "vite";
import * as path from "path";

export default defineConfig(({ mode }) => {
    const name = "video-H264";
    const port: number = parseInt(process.env.APP_PORT || "8000");

    const defaultOptions: UserConfig = {
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src")
            }
        },
        server: {
            host: true,
            port
        }
    };
    
    return {
        ...defaultOptions
    };
});
