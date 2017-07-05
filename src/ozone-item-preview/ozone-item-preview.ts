/**
 * Created by hubert on 8/06/17.
 */

/// <amd-module name="ozone-item-preview"/>
import {customElement} from 'decorators'
import {Media} from 'ozone-type';
import {MediaUrl, OzonePreviewSize} from 'mediaUrl'
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

    static defaultImagePath = "http://icons.iconarchive.com/icons/custom-icon-design/mono-general-2/512/document-icon.png"

    static get properties() {
        return {
            previewImage: {
                type: String
            }
        }
    }

    _editItem(e: Event){
        this.dispatchEvent(new CustomEvent('edit-item',
            {bubbles: true, composed: true, detail:{selectedItem: this}}));
    }

    dataChange(data:any){
        if(this.ozoneTypeApi) {
            this.ozoneTypeApi.ifIsTypeInstanceOf(data.type, 'media').then((isTypeInstanceOf) => {
                if(isTypeInstanceOf) {
                    const mediaUrl = new MediaUrl(data.id as string, this.ozoneTypeApi.config);
                    this.set('previewImage', mediaUrl.getPreviewUrlPng(OzonePreviewSize.Small));
                } else {
                    this.set('previewImage', OzoneItemPreview.defaultImagePath);
                }
            }).catch(() => {
            });
        } else {
            throw new Error('ozoneTypeApi is not define')
        }
    }
    getMinRatio():number{
        const item: Media = this.itemData as Media ;
        return item.previewRatio || 1;
    }

    setDesiredPreviewHeight(desiredPreviewHeight:number){
        this.style.height = String(desiredPreviewHeight);
    }
    setMarginTop(margin:number){
        this.style.marginTop = String(margin);
    }
    setMarginBottom(margin:number){
        this.style.marginBottom = String(margin);
    }
    setMarginLeft(margin:number){
        this.style.marginLeft = String(margin);
    }
    setMarginRight(margin:number){
        this.style.marginRight = String(margin);
    }
    updateDisplay(){}

    _togglePanel(){
        this.$.actionsPanel.classList.toggle("open");
    }

}