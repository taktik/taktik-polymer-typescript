/// <amd-module name="mediaUrl"/>
/**
 * Created by hubert on 21/06/17.
 */


import {jsElement} from 'decorators'

export type SizeEnum = Number;
@jsElement()
export class  OzoneImageSize{
    static Small: SizeEnum= 250;
    static Medium: SizeEnum = 500;
    static Large:SizeEnum = 1500;
}

/**
 * JavaScript class to convert media ID to URL
 */
@jsElement()
export class MediaUrl {

    id:string;
    config: ConfigType;
    constructor(id:string, config: ConfigType){
        this.id = id;
        this.config = config;
    }

    getNumericId():number{
        return parseInt('0x' + this.id.split('-')[4])
    }
    _buildBaseUrl(action:Array<string | number>):string{
        return `${this.config.host}${this.config.view}/${action.join('/')}`;
    }

    getPreviewUrl(size: SizeEnum):string{
        const preview = 'org.taktik.filetype.image.preview.'
                        + size;
        return this
            ._buildBaseUrl([this.getNumericId(), preview])

    }

}