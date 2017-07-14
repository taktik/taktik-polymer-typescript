/**
 * return Clapper player
 * @return {ClapprType|any}
 */
export declare function getPlayer(): ClapprType | undefined;
export interface ClapprType {
    Player: {
        new (param: ClapprParam): ClapprPlayer;
    };
}
export interface ClapprPlayer {
    play(): void;
    pause(): void;
    stop(): void;
    destroy(): void;
    attachTo(element: Element): void;
}
export interface ClapprParam {
    source: string;
    poster: string;
    height?: number;
    width?: number;
}
