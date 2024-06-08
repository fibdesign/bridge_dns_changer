import {exec} from "child_process";

export const getAdaptersEvent = async () => {
    const command:string = 'wmic nic get NetConnectionID';

    return await new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error('Error getting DNS for adapter:', error);
                return reject(error);
            }

            return resolve(parseAdaptersConfig(stdout));
        });
    });


    function parseAdaptersConfig(text:string) {
        const res = text.replaceAll('\r', '').split('\n')
        let _list = [...new Set(res)]
        _list = _list.map(_item => _item.replace(/\s+/g,' ').trim())
        _list = _list.filter(_item => !!_item)
        return _list
    }
}