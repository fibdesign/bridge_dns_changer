import {exec} from "child_process";
import IpcMainEvent = Electron.IpcMainEvent;

export const clearDnsEvent = (_event:IpcMainEvent) => {

    const command1 = `netsh interface ipv4 set dns name="Wi-Fi" dhcp`;
    const command2 = `ipconfig /flushdns`;

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
        });
    });
}