export declare type SizeEnum = Number;
export declare class OzonePreviewSize {
    static Small: SizeEnum;
    static Medium: SizeEnum;
    static Large: SizeEnum;
}
/**
 * JavaScript class to convert media ID to URL
 */
export declare class MediaUrl {
    id: uuid;
    config: ConfigType;
    constructor(id: uuid, config: ConfigType);
    getNumericId(): number;
    private _buildBaseUrl(action);
    getPreviewUrl(size: SizeEnum): string;
    getPreviewUrlPng(size: SizeEnum): string;
    getVideoUrl(): string;
    getVideoUrlMp4(): string;
}
