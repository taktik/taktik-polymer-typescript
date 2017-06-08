/**
 * Created by hubert on 8/06/17.
 */

import {customElement, property} from 'decorators'

export type uuid = string;
export type Item = any;

@customElement('ozone-item-api')
export class OzoneItemAPI  extends OzoneApiAjaxMixin(Polymer.Element){

    static get observers() {
        return ['computeServiceUrl(config.endPoints.items)'];
    }

    create(data:any): Promise<Item> {
        return this.update(data);
    }

    update(data:any): Promise<Item> {
        const url = this._buildUrl('');
        return this._postRequest(url, data);
    }

    getOne(id:uuid):Promise<Item> {
        const url = this._buildUrl(id);
        return this._getRequest(url);
    }

    deleteOne(id:uuid):Promise<uuid> {
        const url = this._buildUrl(id);
        return this._deleteRequest(url);
    }

    bulkGet(ids:Array<uuid>):Promise<Array<Item>> {
        const url = this._buildUrl('bulkGet');
        return this._postRequest(url, ids);
    }

    bulkDelete(ids:Array<uuid>):Promise<Array<uuid>> {
        const url = this._buildUrl('bulkDelete');
        return this._postRequest(url, ids);
    }

    bulkSave(items:Array<any>):Promise<Array<Item>> {
        const url = this._buildUrl('bulkSave');
        return this._postRequest(url, items);
    }

    _postRequest(url:string, body:any): Promise<any> {
    this.$.ozoneAccess.url = url;
    this.$.ozoneAccess.method = 'POST';
    this.$.ozoneAccess.body = JSON.stringify(body);
    return this.$.ozoneAccess
        .generateRequest().completes.then((res:any) => res.response)
    }

    _getRequest(url:string): Promise<any> {
        console.log('_getRequest', url)
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