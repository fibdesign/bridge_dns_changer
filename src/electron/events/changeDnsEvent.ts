import {exec} from "child_process";
import IpcMainEvent = Electron.IpcMainEvent;

export const changeDnsEvent =  (_event:IpcMainEvent, args:any) => {
    const {primaryDns, secondaryDns, adaptor} = args;

    const command1 = `netsh interface ipv4 set dnsservers name="${adaptor}" static ${primaryDns} primary`;
    const command2 = `netsh interface ipv4 add dnsservers name="${adaptor}" ${secondaryDns} index=2`;
    const command3 = 'ipconfig /flushdns';

    exec(command1, (error1, stdout1, stderr1) => {
        if (error1) {
            console.error('Error running command 1:', error1);
            return;
        }
        console.log('Command 1 output:', stdout1);

        exec(command2, (error2, stdout2, stderr2) => {
            if (error2) {
                console.error('Error running command 2:', error2);
                return;
            }
            console.log('Command 2 output:', stdout2);

            exec(command3, (error3, stdout3, stderr3) => {
                if (error3) {
                    console.error('Error running command 3:', error3);
                    return;
                }
                console.log('Command 3 output:', stdout3);
                // Handle successful execution (optional)
            });
        });
    });
}