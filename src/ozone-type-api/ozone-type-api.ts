/// <amd-module name="ozone-type-api"/>
/**
 * Created by hubert on 19/06/17.
 */

import {customElement, domElement, jsElement} from 'decorators'
import {TypeDescriptor, FieldDescriptor} from 'ozone-type'


@customElement('ozone-type-api')
export class OzoneTypeAPI  extends OzoneApiAjaxMixin(Polymer.Element){

    /**
     * collection type.
     * @notify: false
     * @value: item
     */
    collection: string;

    /**
     *
     * @notify: true
     */
    typeDescriptor: TypeDescriptor;


    static get properties() {
        return {
            collection: {
                type: String,
                notify: false,
                value: 'item'
            },
            typeDescriptor: {
                type: Object,
                notify: true
            }
        }
    }
    /**
     * Load api type description form ozone and set typeDescriptor attribute.
     *
     * @return {Promise<TypeDescriptor>}
     */
    loadType():Promise<TypeDescriptor>{
        const url = this._buildTypeUrl();
        return this._getRequest(url)
            .then((response)=>{
                this.set('typeDescriptor', response);
                return this.typeDescriptor;
            });
    }

    _getRequest(url:string): Promise<any> {
        this.$.ozoneAccess.url = url;
        this.$.ozoneAccess.method = 'GET';
        return this.$.ozoneAccess
            .generateRequest().completes.then((res:any) => res.response)
    }

    /**
     * get list of fields of the collection.
     * @return { Array<FieldDescriptor>} list of field
     */
    getFields(): Array<FieldDescriptor>{
        if (this.typeDescriptor.fields) {
            return this.typeDescriptor.fields;
        }
        else return [];
    }

    _buildTypeUrl():string{
        return `${this.config.host}${this.config.type}`
            .replace(/\{type\}/, this.collection);
    }
}