import { exec } from 'child_process';
import util from 'util';

const execAsync = util.promisify(exec);

export const toggleIPv6Event = async (_event: any, args: { adapter: string, enable: boolean }) => {
    const { adapter, enable } = args;
    const state = enable ? 'Enable' : 'Disable';
    const command = `powershell -command ${state}-NetAdapterBinding -Name "${adapter}" -ComponentID ms_tcpip6`;

    try {
        console.log('command', command)
        const { stdout } = await execAsync(command);
        console.log(`[Bridge] IPv6 ${state} on ${adapter}:`, stdout.trim());
        return false;
    } catch (error) {
        console.error(`[Bridge] Failed to ${state} IPv6 on ${adapter}:`, error);
        return true;
    }
};
