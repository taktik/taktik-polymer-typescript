/**
 * Created by hubert on 8/06/17.
 */
import {customElement} from 'decorators'
import {Item} from 'ozone-type'
import {OzoneTypeAPI} from 'ozone-type-api'

export interface rawField{
    name:string,
    type:string,
    value: any
}

/**
 * `ozone-item-view` is hight level polymer module to display raw information an ozone item.
 *
 * Example in html:
 * ```html
 * <ozone-item-view itemData=[[item]] ozoneTypeApiId="ozoneTypeApi"></ozone-item-view>
 * ```
 *
 * Example in javaScript:
 * ```javaScript
 *         var toLocal = document.createElement('ozone-item-view') as OzoneItemView;
 *         toLocal.id = 'ozoneViewContent'
 *         toLocal.className = type;
 *         toLocal.itemData = data;
 *         toLocal.ozoneTypeApi = this.parentNode.querySelector('#ozoneApiType') as OzoneTypeAPI;
 *         this.root.appendChild(toLocal);
 * ```
 */
@customElement('ozone-item-view')
export class OzoneItemView  extends Polymer.Element{


    /**
     * item to display
     */
    itemData:Item;

    /**
     * reference to ozoneTypeApi to use to introspect fields types
     */
    ozoneTypeApi: OzoneTypeAPI;

    /**
     * set the id of the ozoneTypeApi to use to introspect fields types
     * Can only be used if the ozone-api is in the parent element.
     * Use directly ozoneTypeApi for other case.
     */
    ozoneTypeApiId: string;

    /**
     * raw fields information to display
     */
    rawFields: Array<rawField>;

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
            rawFields: {
                type: Array,
                notify: true,
                value: () => ([])
            },ozoneTypeApiId:{
                    type: String
            },
            ozoneTypeApi:{
                type: Object
            }
        }
    }

    static get observers() {
        return [
            '_dataChange(itemData)',
            '_ozoneTypeApiIdChange(ozoneTypeApiId)'];
    }

    _ozoneTypeApiIdChange(ozoneTypeApiId?: string){
        let ozoneTypeApi:OzoneTypeAPI | null = null;
        if(ozoneTypeApiId) {
            ozoneTypeApi = this.parentNode.querySelector(`#${ozoneTypeApiId}`) as OzoneTypeAPI;
        }
        if(ozoneTypeApi){
            this.ozoneTypeApi = ozoneTypeApi;
        }
    }

    _dataChange(data:Item){
        let rawFields: Array<rawField> = [];
        for (let entry in data){
            this.ozoneTypeApi.findFieldInCollection(data.type, entry)
                .then((description)=>{
                    console.log(data.type, entry, description);

                    let fieldType;
                    if(description && description.fieldType) {
                        fieldType = description.fieldType;
                    } else {
                        fieldType = "unknown";
                    }

                    this.push('rawFields',{
                        name:entry,
                        type:fieldType,
                        value: data[entry]
                    });
                });

        }
    }
}