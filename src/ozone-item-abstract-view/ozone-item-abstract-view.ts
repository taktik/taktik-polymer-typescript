/**
 * Created by hubert on 8/06/17.
 */
/// <amd-module name="ozone-item-abstract-view"/>

import {customElement} from 'decorators'
import {Item} from 'ozone-type'
import {OzoneTypeAPI, getOzoneTypeAPI} from 'ozone-type-api'
import {MediaUrl, SizeEnum, OzonePreviewSize} from 'mediaUrl'

export interface rawField{
    name:string,
    type:string,
    value: any
}


export declare interface OzoneItemAbstractViewInterface extends PolymerElement {
    /**
     * item to display
     */
    itemData: Item;

    /**
     * reference to ozoneTypeApi to use to introspect fields types
     * By default it use getOzoneTypeAPI() to get the API
     * Use this field if you don't need the default TypeApi
     */
    ozoneTypeApi: OzoneTypeAPI;

    /**
     * url of the image preview
     */
    previewImage: string;

    /**
     * observer function on itemData.
     * Overwrite this function in child implementation
     * @abstract
     * @param {Item} data
     */
    dataChange(data: Item):void;

    loadImage(data: Item, size:SizeEnum):Promise <void>
}

export declare interface OzoneItemAbstractViewConstructor {
    new(): OzoneItemAbstractViewInterface;
}
export declare interface OzoneItemAbstractViewMixinType{
    (parentClass: PolymerElementConstructor):OzoneItemAbstractViewConstructor
}
/**
 * `OzoneItemAbstractView` is an abstract class for item view.
 * It provide ozoneTypeApi and an observer on the itemData.
 *
 * Example in javaScript:
 * ```javaScript
 *         class OzoneItemPreview extends OzoneItemAbstractView(Polymer.Element){
 *          //place your code here
 *         }
 * ```
 */

export  const OzoneItemAbstractView: OzoneItemAbstractViewMixinType  = Polymer.dedupingMixin<any>(function(superClass:PolymerElementConstructor) {
    @customElement('ozone-item-abstract-view')
    class OzoneItemAbstractViewClass extends superClass {


        /**
         * item to display
         */
        itemData: Item;

        /**
         * reference to ozoneTypeApi to use to introspect fields types
         * By default it use getOzoneTypeAPI() to get the API
         * Use this field if you don't need the default TypeApi
         */
        ozoneTypeApi: OzoneTypeAPI;

        /**
         * url of the image preview
         */
        previewImage: string | undefined;


        static get properties() {
            return {
                /**
                 * item data
                 */
                itemData: {
                    type: Object,
                    notify: true,
                    value: () => ({})
                },
                ozoneTypeApi: {
                    type: Object
                },
                previewImage: {
                    type: String,
                }
            }
        }

        static get observers() {
            return [
                'dataChange(itemData)'];
        }


        connectedCallback() {
            this.ozoneTypeApi = getOzoneTypeAPI();
            super.connectedCallback();
        }

        /**
         * observer function on itemData.
         * Overwrite this function in child implementation
         * @abstract
         * @param {Item} data
         */
        dataChange(data: Item) {
        }


        async loadImage(data?: Item, size?:SizeEnum){
            size = size || OzonePreviewSize.Small;
            if(this.ozoneTypeApi && data) {
                if (await ( this.ozoneTypeApi.ifIsTypeInstanceOf(data.type, 'media'))) {
                    const mediaUrl = new MediaUrl(data.id as string, this.ozoneTypeApi.config);
                    this.set('previewImage', mediaUrl.getPreviewUrl(size));
                } else {
                    //TODO define preview
                    this.set('previewImage', undefined);
                }
            }
        }
    }
    return OzoneItemAbstractViewClass;
});