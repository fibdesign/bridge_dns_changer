import {join} from "path";

const config = {
    port: 2003,

    window: {
        width: 1000,
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