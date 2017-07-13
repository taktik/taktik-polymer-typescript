/// <amd-module name="taktik-clappr-wrapper"/>

declare var Clappr: ClapprType | undefined ;

/**
 * return Clapper player
 * @return {ClapprType|any}
 */
export function getPlayer(): ClapprType | undefined{
    let clapperCopy: ClapprType | undefined;
    try {
        clapperCopy = Clappr;

        console.log('clappr OK')
    } catch (err) {
        clapperCopy = undefined;
        console.log('clappr not found')
    }
    return clapperCopy
};

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
