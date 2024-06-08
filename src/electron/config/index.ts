import {join} from "path";

const config = {
    port: 5173,

    window: {
        width: 400,
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