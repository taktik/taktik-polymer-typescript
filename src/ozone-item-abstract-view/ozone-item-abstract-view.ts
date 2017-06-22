/**
 * Created by hubert on 8/06/17.
 */
/// <amd-module name="ozone-item-abstract-view"/>

import {customElement} from 'decorators'
import {Item} from 'ozone-type'
import {OzoneTypeAPI, getOzoneTypeAPI} from 'ozone-type-api'


export interface rawField{
    name:string,
    type:string,
    value: any
}

export declare class OzoneItemAbstractViewClass extends Polymer.Element {}
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

export  const OzoneItemAbstractView: any  = Polymer.dedupingMixin<OzoneItemAbstractViewClass>(function(superClass:PolymerElementConstructor) {
    @customElement('ozone-item-abstract-view')
    class OzoneItemAbstractViewClass extends superClass {


        /**
         * item to display
         */
        itemData: Item;

        /**
         * reference to ozoneTypeApi to use to introspect fields types
         * By default it use getOzoneTypeAPI() to get the API
         * Use this fild if you don't need the default TypeApi
         */
        ozoneTypeApi: OzoneTypeAPI;

        /**
         * url of the image preview
         */
        previewImage: string;


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
    }
    return OzoneItemAbstractViewClass;
});