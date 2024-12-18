import {join} from "path";

export const IS_DEV = false;

const config = {
    port: 2003,

    window: {
        width: IS_DEV ? 1000 : 400,
        height: 700,
        title: 'DNS Changer',
        center: true,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            preload: join(__dirname, '../main/preload.js'),
        },
    }
}

export default config