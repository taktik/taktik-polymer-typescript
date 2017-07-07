/**
 * Created by hubert on 23/06/17.
 */


/// <amd-module name="ozone-upload"/>

import {customElement} from 'decorators'
import {UploadFileRequest, XMLHttpRequestLike} from 'ozone-upload-api'


export interface vaadinUploadType extends PolymerElement{
    _createXhr:{ ():XMLHttpRequestLike }
}
export interface DomElements {
    vaadinUpload: vaadinUploadType
}

/**
 * <ozone-upload> is a template module start an ozone polymer module.
 *
 * ```html
 * <ozone-upload> Document usage with code example </ozone-upload>
 * ```
 */
@customElement('ozone-upload')
export class OzoneUpload extends Polymer.Element {

    $: DomElements;

    ready(){
        super.ready();

        this.$.vaadinUpload._createXhr = ()=> {
            return new UploadFileRequest();

        }
    }

}{}