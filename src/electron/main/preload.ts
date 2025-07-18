const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('ipcRenderer', {
    on: (channel:any, func:any) => {
        const listener = (event:any, ...args:any) => func(...args)
        ipcRenderer.on(channel, listener)
        // Return a function to remove this listener if needed
        return () => ipcRenderer.removeListener(channel, listener)
    },
    removeListener: (channel:any, func:any) => {
        ipcRenderer.removeListener(channel, func)
    },
    send: (channel:any, data:any) => {
        ipcRenderer.send(channel, data)
    },
    invoke: (channel:any, data:any) => {
        return ipcRenderer.invoke(channel, data)
    }
})
