const useStorage = {
    get: <T>(key: string, defaultValue?: T): T => {
        if(!localStorage.getItem(key) && defaultValue){
            return defaultValue
        }
        return JSON.parse(localStorage.getItem(key) || "null") as T;
    },
    set: (key: string, val: unknown): void => {
        localStorage.setItem(key, JSON.stringify(val));
    },
    remove: (key: string): void => {
        localStorage.removeItem(key);
    },
    clear: (): void => {
        localStorage.clear();
    },
};
export default useStorage;
