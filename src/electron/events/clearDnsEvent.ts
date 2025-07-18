import {exec} from "child_process";
import IpcMainEvent = Electron.IpcMainEvent;
import util from 'util';
const execAsync = util.promisify(exec);

export const clearDnsEvent = async (_event:IpcMainEvent, adapter: string = 'Wi-Fi') => {
    try {
        const command1 = `netsh interface ipv4 set dns name="${adapter}" dhcp`;
        const command2 = `ipconfig /flushdns`;

        const { stdout: stdout1 } = await execAsync(command1);
        console.log('[Bridge] DNS reset to DHCP:', stdout1.trim());

        const { stdout: stdout2 } = await execAsync(command2);
        console.log('[Bridge] DNS cache flushed:', stdout2.trim());

        return true;
    } catch (error) {
        console.error('[Bridge] Failed to clear DNS:', error);
        return false;
    }
}