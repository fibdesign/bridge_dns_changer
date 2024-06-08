import {exec} from "child_process";

export const checkDnsEvent = async (_event:any, adapter: string = 'Wi-Fi') => {

    const command:string = `netsh interface ipv4 show dnsservers name="${adapter}"`;

    return await new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error('Error getting DNS for adapter:', error);
                return reject(error);
            }

            return resolve(parseDnsConfig(stdout));
        });
    });

    function parseDnsConfig(text:string) {
        const regex = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/g;
        return text.match(regex)
    }
}

