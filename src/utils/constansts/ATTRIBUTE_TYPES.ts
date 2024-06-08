export enum ATTRIBUTE_TYPES {
    STRING,
    BOOLEAN
}
export enum ATTRIBUTE_TYPES_TITLES {
    'متن',
    'بلی/خیر'
}
export const ATTRIBUTE_TYPES_OBJ = [
    {
        title: ATTRIBUTE_TYPES_TITLES[ATTRIBUTE_TYPES.STRING],
        value: ATTRIBUTE_TYPES.STRING
    },
    {
        title: ATTRIBUTE_TYPES_TITLES[ATTRIBUTE_TYPES.BOOLEAN],
        value: ATTRIBUTE_TYPES.BOOLEAN
    },
]