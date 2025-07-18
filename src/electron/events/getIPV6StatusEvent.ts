import { exec } from 'child_process';
import util from 'util';

const execAsync = util.promisify(exec);

export const getIPV6StatusEvent = async (_event: any,adapter: string = 'Wi-Fi') => {
    const command = `powershell -command (Get-NetAdapterBinding -Name "${adapter}" -ComponentID ms_tcpip6).Enabled`;

    try {
        const { stdout } = await execAsync(command);
        console.error(`[Bridge] IPv6 status on ${adapter}:`, stdout);
        return stdout.trim() == 'True';
    } catch (error) {
        console.error(`[Bridge] Failed to get IPv6 status on ${adapter}:`, error);
        return null;
    }
}