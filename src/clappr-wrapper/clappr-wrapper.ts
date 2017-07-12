/// <amd-module name="clappr-wrapper"/>

debugger
declare var Clappr: ClapprType | undefined ;
export var ClapprWrapper: ClapprType | undefined = Clappr;

export interface ClapprType {
    Player: {new(param:ClapprParam): ClapprPlayer}
}

export interface ClapprPlayer {
    play():void
    pause():void
    stop():void
    destroy(): void
    attachTo(element: Element):void
}

export interface ClapprParam {
    source: string;
    poster: string,
    height?: number,
    width?: number
}
