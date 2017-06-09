/**
 * Created by hubert on 8/06/17.
 */

import {customElement, domElement} from 'decorators'
import {Item} from 'ozone-type'

export interface DomElements {
    ozoneAccess:IronAjax
}
export interface BulkResponse {
    response:Array<Item>;
}
export interface ItemResponse {
    response:Item;
}

@customElement('ozone-item-api')
export class OzoneItemAPI  extends OzoneApiAjaxMixin(Polymer.Element){

    @domElement()
    $: DomElements;

    //@property()
    collection:string;

    static get properties() {
        return {
            /**
             * type of the ozone collection.
             * Default value is 'items'
             */
            collection: {
                type: String,
                notify: false,
                value: 'items'
            }
        }
    }
    static get observers() {
        return [
            '_collectionChange(collection, config.endPoints.*)'];
    }
    _collectionChange(collection: string, endpoints: any): void{

        if(collection && endpoints.value && this.config){
            this.computeServiceUrl(endpoints.value[collection])
        }
    }

    /**
     * Create or update a collection item.
     * @param data Item item to create.
     * @return {Promise<Item>}
     */
    create(data:Item): Promise<Item> {
        return this.update(data);
    }

    /**
     * Create or update a collection item.
     * @param data Item item to update.
     * @return {Promise<Item>}
     */
    update(data:Item): Promise<Item> {
        const url = this._buildUrl('');
        return this._postRequest(url, data, this._readItemResponse);
    }

    /**
     * get one collection item by uuid.
     * @param id
     * @return {Promise<Item>}
     */
    getOne(id:uuid):Promise<Item> {
        const url = this._buildUrl(id);
        return this._getRequest(url);
    }

    /**
     * delete one collection item by uuid.
     * @param id
     * @return {Promise<any>}
     */
    deleteOne(id:uuid):Promise<uuid> {
        const url = this._buildUrl(id);
        return this._deleteRequest(url);
    }

    /**
     * get collection items from a list of id.
     * @param ids {Array<uuid>} array of id to get
     * @return {Promise<Iterator<Item>>} promise resole with an iterator of collection item
     */
    bulkGet(ids:Array<uuid>):Promise<Iterator<Item>> {
        const url = this._buildUrl('bulkGet');
        return this._postRequest(url, ids, this._readBulkItemResponse);
    }

    /**
     * delete items from a list of id.
     * @param ids
     * @return {Promise<Array<uuid>>} promise resole with an array of deleted id
     */
    bulkDelete(ids:Array<uuid>):Promise<Array<uuid>> {
        const url = this._buildUrl('bulkDelete');
        return this._postRequest(url, ids, this._readItemResponse);
    }

    /**
     * save an array of items
     * @param items
     * @return {Promise<Iterator<Item>>} promise resole with an iterator of collection item
     */
    bulkSave(items:Array<any>):Promise<Iterator<Item>> {
        const url = this._buildUrl('bulkSave');
        return this._postRequest(url, items, this._readBulkItemResponse);
    }

    _readItemResponse = (res:ItemResponse) => res.response;

    _readBulkItemResponse =  (res:BulkResponse) => {
        return (function* ():Iterator<Item> {
            for (let item of res.response) {
                yield item;
            }
        })();
    };

    _postRequest(url:string, body:any, responseFilter:any): Promise<any> {
        this.$.ozoneAccess.url = url;
        this.$.ozoneAccess.method = 'POST';
        this.$.ozoneAccess.body = JSON.stringify(body);
        return this.$.ozoneAccess
            .generateRequest().completes.then(responseFilter)
    }

    _getRequest(url:string): Promise<any> {
        this.$.ozoneAccess.url = url;
        this.$.ozoneAccess.method = 'GET';
        return this.$.ozoneAccess
            .generateRequest().completes.then((res:any) => res.response)
    }

    _deleteRequest(url:string): Promise<any> {
        this.$.ozoneAccess.url = url;
        this.$.ozoneAccess.method = 'DELETE';
        return this.$.ozoneAccess
            .generateRequest().completes.then((res:any) => res.response)
    }

    _buildUrl(action:string):string{
        return `${this.serviceUrl}/${action}`;
    }



}