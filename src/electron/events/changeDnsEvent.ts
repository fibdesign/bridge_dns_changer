import {exec} from "child_process";

export const changeDnsEvent =  async (_event:any, args:any) => {
    const {primaryDns, secondaryDns, adaptor} = args;

    const command1 = `netsh interface ipv4 set dnsservers name="${adaptor}" static ${primaryDns} primary`;
    const command2 = `netsh interface ipv4 add dnsservers name="${adaptor}" ${secondaryDns} index=2`;
    const command3 = 'ipconfig /flushdns';


    return await new Promise((resolve, reject) => {
        exec(command1, (error, stdout, stderr) => {
            if (error) {
                console.error('Error getting DNS for adapter:', error);
                return reject(error);
            }

            console.log('Command 1 output:', stdout);
        });
        exec(command2, (error, stdout, stderr) => {
            if (error) {
                console.error('Error getting DNS for adapter:', error);
                return reject(error);
            }
            console.log('Command 1 output:', stdout);
        });
        exec(command3, (error, stdout, stderr) => {
            if (error) {
                console.error('Error getting DNS for adapter:', error);
                return reject(error);
            }
            console.log('Command 1 output:', stdout);
        });
        return resolve(true);
    });
}