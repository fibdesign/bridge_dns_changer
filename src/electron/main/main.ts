import {join} from 'path';
import {app, BrowserWindow, dialog, ipcMain, shell} from 'electron';
import {exec} from 'child_process';
import {EVENTS_KEYS} from "../utils/EVENTS_KEYS";

const isDev = process.env.npm_lifecycle_event === "app:dev";

async function handleFileOpen() {
    const {canceled, filePaths} = await dialog.showOpenDialog({title: "Open File"})
    if (!canceled) {
        return filePaths[0]
    }
}

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 400,
        height: 700,
        title: 'DNS Changer',
        center: true,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            preload: join(__dirname, './preload.js'),
        },
    });
    mainWindow.setMenu(null)

    if (isDev) {
        mainWindow.loadURL('http://localhost:5173');
    } else {
        mainWindow.loadFile(join(__dirname, '../../../index.html'));
    }
    // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    ipcMain.handle('dialog:openFile', handleFileOpen)
    ipcMain.on(EVENTS_KEYS.CHANGE_DNS, (event, args) => {
        const {primaryDns, secondaryDns} = args;

        const command1 = `netsh interface ipv4 set dnsservers name="Wi-Fi" static ${primaryDns} primary`;
        const command2 = `netsh interface ipv4 add dnsservers name="Wi-Fi" ${secondaryDns} index=2`;
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
    });
    ipcMain.on(EVENTS_KEYS.CLEAR_DNS, (event) => {

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
    });
    ipcMain.on(EVENTS_KEYS.OPEN_LINK, (event, url: string) => {
        shell.openExternal(url)
    });
    createWindow()
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
