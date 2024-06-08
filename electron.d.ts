declare global {
    interface Electron {
        ipcRenderer: {
            // Define available methods and properties of ipcRenderer
            send(channel: string, ...args: any[]): void;
            on(channel: string, listener: (event: any, ...args: any[]) => void): any;
            // Add other methods as needed
        };
    }
}
