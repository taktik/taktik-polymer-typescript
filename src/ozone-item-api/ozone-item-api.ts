/**
 * Created by hubert on 8/06/17.
 */

import {customElement, property, domElement} from 'decorators'

export type uuid = string;
export type Item = any;

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

    @property()
    collection:string = 'items';

    static get observers() {
        return [
            '_collectionChange(collection, config.endPoints.*)'];
    }

    _collectionChange(collection: string, endpoints: any): void{

        if(collection && endpoints.value && this.config){
            this.computeServiceUrl(endpoints.value[collection])
        }
    }

    create(data:any): Promise<Item> {
        return this.update(data);
    }

    update(data:any): Promise<Item> {
        const url = this._buildUrl('');
        return this._postRequest(url, data, this._readItemResponse);
    }

    getOne(id:uuid):Promise<Item> {
        const url = this._buildUrl(id);
        return this._getRequest(url);
    }

    deleteOne(id:uuid):Promise<uuid> {
        const url = this._buildUrl(id);
        return this._deleteRequest(url);
    }

    bulkGet(ids:Array<uuid>):Promise<Iterator<Item>> {
        const url = this._buildUrl('bulkGet');
        return this._postRequest(url, ids, this._readBulkItemResponse);
    }

    bulkDelete(ids:Array<uuid>):Promise<Array<uuid>> {
        const url = this._buildUrl('bulkDelete');
        return this._postRequest(url, ids, this._readItemResponse);
    }

    bulkSave(items:Array<any>):Promise<Iterator<Item>> {
        const url = this._buildUrl('bulkSave');
        return this._postRequest(url, items, this._readBulkItemResponse);
    }

    _readItemResponse = (res:ItemResponse):Item => {
        return res.response;
    };

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