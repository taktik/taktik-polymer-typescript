/// <amd-module name="taktik-helper/clappr-wrapper/clappr-wrapper"/>

declare var Clappr: ClapprType | undefined ;
var clapperCopy: ClapprType | undefined;
try {
    clapperCopy = Clappr;
} catch (err) {
    clapperCopy = undefined;
}

export var ClapprWrapper: ClapprType | undefined = clapperCopy;

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
