/**
 * Created by hubert on 8/06/17.
 */

/// <amd-module name="ozone-item-preview"/>
import {customElement} from 'decorators'
import {MediaUrl, OzoneImageSize} from 'mediaUrl'
import{OzoneItemAbstractView, OzoneItemAbstractViewConstructor} from 'ozone-item-abstract-view'


/**
 * `ozone-item-preview` is hight level polymer module to display preview information an ozone item.
 *
 * Example in html:
 * ```html
 * <ozone-item-preview itemData=[[item]]></ozone-item-view>
 * ```
 *
 */
@customElement('ozone-item-preview')
export class OzoneItemPreview  extends OzoneItemAbstractView(Polymer.Element){

    /**
     * url of the image preview
     */
    previewImage: string;

    static get properties() {
        return {
            previewImage: {
                type: String
            }
        }
    }

    async dataChange(data:any){
        await ( this.loadImage(data, OzoneImageSize.Small))
    }
}