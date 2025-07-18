import {join} from "path";

export const IS_DEV = process.env.npm_lifecycle_event === "app:dev" || false;

const config = {
    port: 2003,

    window: {
        width: 1200,
        height: 900,
        title: 'Bridge - DNS Changer',
        center: true,
        resizable: true,
        webPreferences: {
            nodeIntegration: true,
            preload: join(__dirname, '../main/preload.js'),
        },
        icon: join(__dirname, '../../../images/logo.png'),
    }
}

export default config