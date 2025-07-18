import { exec } from 'child_process';
import util from 'util';

const execAsync = util.promisify(exec);

export const checkDnsEvent = async (_event: any, adapter: string = 'Wi-Fi') => {
    const command = `netsh interface ipv4 show dnsservers name="${adapter}"`;

    try {
        const { stdout } = await execAsync(command);
        const dnsList = parseDnsConfig(stdout);

        console.log('[Bridge] Current DNS servers for adapter:', dnsList);
        return dnsList;
    } catch (error) {
        console.error('[Bridge] Failed to retrieve DNS settings:', error);
        return null;
    }
};

function parseDnsConfig(output: string): string[] {
    const matches = output.match(/(\d{1,3}\.){3}\d{1,3}/g);
    return matches ?? [];
}
