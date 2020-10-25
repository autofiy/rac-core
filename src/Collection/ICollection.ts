export interface ICollection {

    render(): any;

    updateConfiguration(key: string, newConfiguration: any, afterChange?: () => void): void;

    getConfiguration(key: string): any;

}