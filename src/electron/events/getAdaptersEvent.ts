import { exec } from 'child_process';
import util from 'util';

const execAsync = util.promisify(exec);

export const getAdaptersEvent = async (): Promise<string[]> => {
    const command = 'wmic nic where "NetEnabled=true" get NetConnectionID';

    try {
        const { stdout } = await execAsync(command);
        const adapters = parseAdaptersConfig(stdout);
        console.log('[Bridge] Active adapters:', adapters.length);
        return adapters;
    } catch (error) {
        console.error('[Bridge] Failed to get adapters:', error);
        return [];
    }
};

function parseAdaptersConfig(text: string): string[] {
    return (
        text
            .replace(/\r/g, '')
            .split('\n')
            .map(line => line.trim())
            .filter(line => line && line !== 'NetConnectionID')
    );
}
