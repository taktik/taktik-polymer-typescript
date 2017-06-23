/**
 * Created by hubert on 8/06/17.
 */
import {customElement} from 'decorators'
import {Item} from 'ozone-type'
import {FieldDescriptor} from 'ozone-type'
import{OzoneItemAbstractView, OzoneItemAbstractViewConstructor} from 'ozone-item-abstract-view'

import {MediaUrl, OzoneImageSize} from 'mediaUrl'

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
 * <ozone-item-view itemData=[[item]] ozoneTypeApiId="DifferentOzoneTypeApi"></ozone-item-view>
 * ```
 *
 * Example in javaScript:
 * ```javaScript
 *         var toLocal = document.createElement('ozone-item-view') as OzoneItemView;
 *         toLocal.id = 'ozoneViewContent'
 *         toLocal.className = type;
 *         toLocal.itemData = data;
 *         // if you don't want to use the default API
 *         toLocal.ozoneTypeApi = this.parentNode.querySelector('#ozoneApiType') as OzoneTypeAPI;
 *         this.root.appendChild(toLocal);
 * ```
 */
@customElement('ozone-item-view')
export class OzoneItemView  extends OzoneItemAbstractView(Polymer.Element) {


    /**
     * raw fields information to display
     */
    rawFields: Array<rawField>;

    /**
     * url of the image preview
     */
    previewImage: string;

    static get properties() {
        return {
            rawFields: {
                type: Array,
                notify: true,
                value: () => ([])
            },
            previewImage: {
                type: String
            }
        }
    }


    dataChange(data:Item){
        let rawFields: Array<rawField> = [];
        for (let entry in data){
            this.ozoneTypeApi.findFieldInCollection(data.type, entry)
                .then((description:FieldDescriptor)=>{
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
        this.ozoneTypeApi.ifIsTypeInstanceOf(data.type, 'media').then(()=> {
            const mediaUrl = new MediaUrl(data.id as string, this.ozoneTypeApi.config);
            this.set('previewImage', mediaUrl.getPreviewUrl(OzoneImageSize.Small));
        }).catch(()=> {});
    }
}