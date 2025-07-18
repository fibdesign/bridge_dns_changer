import {networkInterfaces} from 'os';

export const getActiveAdaptor = async () => {
    const nets = networkInterfaces();
    let resultName = 'Wi-Fi'
    for (const name of Object.keys(nets)) {
        const iface = nets[name];
        if (!iface) continue;
        for (const net of iface) {
            if (net.family === 'IPv4' && !net.internal && net.address) {
                resultName = name; // Return the first suitable interface
            }
        }
    }
    return resultName;
}