/// <amd-module name="ozone-item-api"/>
/// <reference path="../../bower_components/reflect-metadata/Reflect.d.ts" />

/**
 * Created by hubert on 8/06/17.
 */

import {customElement, domElement, jsElement} from 'decorators'
import {Item, SearchRequest, ItemSearchResult} from 'ozone-type'

export interface DomElements {
    ozoneAccess:IronAjax
}
export interface BulkResponse {
    response:Array<Item>;
}
export interface SearchResponse {
    response: ItemSearchResult;
}


export interface ItemResponse {
    response:Item;
}

export interface SearchResult {
    results: Array<Item>;
    total: number;
}
/**
 * `ozone-item-api` is low level polymer module to ozone api.
 * It provide CRUD operation and search in a given collection.
 *
 * Example:
 * ```html
 * <ozone-api-search collection="item"></ozone-api-search>
 * ```
 */
@customElement('ozone-item-api')
export class OzoneItemAPI  extends OzoneApiAjaxMixin(Polymer.Element){

    @domElement()
    $: DomElements;


    /**
     * type of the ozone collection.
     * Default value is 'item'
     */
    collection:string;


    static get properties() {
        return {
            collection: {
                type: String,
                notify: false,
                value: 'item'
            }
        }
    }
    static get observers() {
        return [
            '_collectionChange(collection, config.endPoints.*)'
        ];
    }

    /**
     * Fired when element is configured.
     * This event will be fired if the config change.
     *
     * @event configured
     */

    _collectionChange(collection: string, endpoints: any): void{

        if(collection && endpoints.value && this.config){
            this.computeServiceUrl(endpoints.value[collection])
            this.dispatchEvent(new CustomEvent('configured',
                {bubbles: true, composed: true}));
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
     * @return {Promise<Item | null>}
     */
    getOne(id:uuid):Promise<Item | null> {
        const url = this._buildUrl(id);
        return this._getRequest(url)
            .then(response => {
                if(response == ''){
                    return null;
                } else {
                    return response
                }
            });
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
    bulkGet(ids:Array<uuid>):Promise<Array<Item>> {
        const url = this._buildUrl('bulkGet');
        return this._postRequest(url, ids, this._readBulkItemResponse);
    }

    /**
     * delete items from a list of id.
     * @param ids
     * @return {Promise<Array<uuid>>} promise resole with an array of deleted id
     */
    bulkDelete(ids:Array<uuid| undefined>):Promise<Array<uuid>> {
        const url = this._buildUrl('bulkDelete');
        return this._postRequest(url, ids, this._readItemResponse);
    }

    /**
     * save an array of items
     * @param items
     * @return {Promise<Iterator<Item>>} promise resole with an iterator of collection item
     */
    bulkSave(items:Array<Item>):Promise<Array<Item>> {
        const url = this._buildUrl('bulkSave');
        return this._postRequest(url, items, this._readBulkItemResponse);
    }

    /**
     * Submit ozone search query
     */
    search (search: SearchQuery): SearchGenerator {
        const url = this._buildUrl('search');

        return new SearchGenerator(url, search, this.$.ozoneAccess);
    }

    _readItemResponse = (res:ItemResponse) => res.response;

    _readBulkItemResponse =  (res:BulkResponse):Array<Item> => {
        return res.response;
    };

    _postRequest(url:string, body:any, responseFilter:any): Promise<any> {
        this.$.ozoneAccess.url = url;
        this.$.ozoneAccess.method = 'POST';
        this.$.ozoneAccess.body = JSON.stringify(body);
        return this.$.ozoneAccess
            .generateRequest().completes.then(responseFilter.bind(this))
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

/**
 * Class helper to create searchQuery.
 * Example:
 * ```javaScript
 *   let searchQuery = new SearchQuery();
 *   searchQuery.quicksearch('');
 *   const searchGenerator = ozoneItemApi.search(searchQuery);
 *
 * ```
 */
@jsElement()
export class SearchQuery {
    _searchRequest: SearchRequest = {
        size: 10
    };

    get searchQuery () {return JSON.stringify(this._searchRequest)}

    get size(): number{return this._searchRequest.size || 0;}
    set size(size: number) {this._searchRequest.size = size;}
    get offset(): number{return this._searchRequest.offset || 0;}
    set offset(size: number) {this._searchRequest.offset = size;}


    /**
     *
     * @param searchString
     */
    quicksearch(searchString: string): void {

        let searchParam:SearchRequest = {};

        searchParam.size = this.size;
        searchParam.query = {
            "$type": "QueryStringQuery",
            "field": "_quicksearch",
            "queryString": `${searchString}*`
        };

        this._searchRequest = searchParam;
    }

    suggestion(searchString: string, lastTerm?:string){
        let searchParam:SearchRequest = {};
        if(lastTerm) {
            searchParam.aggregations = [{
                "$type": "TermsAggregation",
                "name": "suggest",
                "field": "_quicksearch",
                "order": "COUNT_DESC",
                "size": this.size,
                "includePattern": `${lastTerm}.*`
            }];
        }
        searchParam.query = {
            "$type": "QueryStringQuery",
            "field": "_quicksearch",
            "queryString": `${searchString}*`
        };

    }

}
/**
 * Class helper to iterate on search result.
 * Example:
 * ```javaScript
 *   let searchQuery = new SearchQuery();
 *   searchQuery.quicksearch('');
 *   const searchGenerator = ozoneItemApi.search(searchQuery);
 *   searchGenerator.next().then((searchResult)=>{
 *               searchResult.results.forEach((item)=>{
 *                   this.push('items', item);
 *               })
 *           });
 * ```
 */
@jsElement()
export class SearchGenerator {
    searchParam:SearchQuery;
    url:string;
    total: number;
    ozoneAccess:IronAjax;
    offset:number = 0;
    done:boolean = false;

    constructor(url:string, searchParam: SearchQuery, ozoneAccess:any){
        this.searchParam = searchParam;
        this.url = url;
        this.ozoneAccess = ozoneAccess
    }
    next(): Promise<SearchResult>{
        this.searchParam.offset = this.offset;
        return this._postRequest(this.url, this.searchParam.searchQuery, this._readSearchResponse);
    }

    _postRequest(url:string, body:string, responseFilter:any): Promise<any> {
        this.ozoneAccess.url = url;
        this.ozoneAccess.method = 'POST';
        this.ozoneAccess.body = body;
        return this.ozoneAccess
            .generateRequest().completes.then(responseFilter.bind(this))
    }

    _readSearchResponse (res:SearchResponse):SearchResult {
        this.total = Number(res.response.total);
        this.offset += Number(res.response.size);
        this.done = this.offset < this.total;
        let results = res.response.results || [];
        return {
            results,
            total: this.total
        };
    }

}