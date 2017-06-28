/**
 * Created by hubert on 8/06/17.
 */
import {customElement} from 'decorators'
import {MediaUrl, OzonePreviewSize} from 'mediaUrl'
import{OzoneItemAbstractView} from 'ozone-item-abstract-view'


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

    dataChange(data:any){
        if(this.ozoneTypeApi) {
            this.ozoneTypeApi.ifIsTypeInstanceOf(data.type, 'media').then(() => {
                const mediaUrl = new MediaUrl(data.id as string, this.ozoneTypeApi.config);
                this.set('previewImage', mediaUrl.getPreviewUrl(OzonePreviewSize.Small));
            }).catch(() => {
            });
        } else {
            throw new Error('ozoneTypeApi is not define')
        }
    }
}