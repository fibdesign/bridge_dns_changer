import {exec} from "child_process";
import util from 'util';
const execAsync = util.promisify(exec);

export const changeDnsEvent =  async (_event:any, args:any) => {
    const { primaryDns, secondaryDns, adaptor } = args;

    try {
        const command1 = `netsh interface ipv4 set dnsservers name="${adaptor}" static ${primaryDns} primary`;
        const command2 = `netsh interface ipv4 add dnsservers name="${adaptor}" ${secondaryDns} index=2`;
        const command3 = 'ipconfig /flushdns';

        const { stdout: out1 } = await execAsync(command1);
        console.log('[Bridge] Primary DNS set:', out1.trim());

        const { stdout: out2 } = await execAsync(command2);
        console.log('[Bridge] Secondary DNS added:', out2.trim());

        const { stdout: out3 } = await execAsync(command3);
        console.log('[Bridge] DNS cache flushed:', out3.trim());

        return false;
    } catch (error) {
        console.error('[Bridge] Failed to change DNS:', error);
        return true;
    }
}