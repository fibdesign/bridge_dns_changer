export default interface EventListenerServiceType {
    target: any,
    event: string,
    callback: () => void,
}