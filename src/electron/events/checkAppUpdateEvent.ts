import {autoUpdater, UpdateCheckResult} from "electron-updater";

export const checkAppUpdateEvent = async (event:any): Promise<{success: boolean, result: UpdateCheckResult|null|any}> => {
    try {
        const result = await autoUpdater.checkForUpdates();
        return { success: true , result};
    } catch (err:any) {
        return { success: false, result: err.message };
    }
}