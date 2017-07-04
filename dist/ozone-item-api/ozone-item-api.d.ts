import { Item, SearchRequest, ItemSearchResult } from 'ozone-type';
export interface DomElements {
    ozoneAccess: IronAjax;
}
export interface BulkResponse {
    response: Array<Item>;
}
export interface SearchResponse {
    response: ItemSearchResult;
}
export interface ItemResponse {
    response: Item;
}
export interface SearchResult {
    results: Array<Item>;
    total: number;
}
declare const OzoneItemAPI_base: OzoneApiAjaxMixinConstructor;
/**
 * `ozone-item-api` is low level polymer module to ozone api.
 * It provide CRUD operation and search in a given collection.
 *
 * By default a `ozone-item-api` will be add in the root document
 * and can loaded form javaScript using *getOzoneItemAPI*
 * Example in Html
 * ```html
 * <ozone-api-search id="myAPI" collection="item"></ozone-api-search>
 * ```
 * Example
 * ```javaScript
 * const ozoneApiSearch = getOzoneItemAPI(); // return instance of OzoneItemAPI located in the dom
 * ```
 */
export declare class OzoneItemAPI extends OzoneItemAPI_base {
    $: DomElements;
    /**
     * type of the ozone collection.
     * Default value is 'item'
     */
    collection: string;
    static readonly properties: {
        collection: {
            type: StringConstructor;
            notify: boolean;
            value: string;
        };
    };
    static readonly observers: string[];
    /**
     * Fired when element is configured.
     * This event will be fired if the config change.
     *
     * @event configured
     */
    /**
     * observer on collection
     * @private
     */
    _collectionChange(collection: string, endpoints: any): void;
    /**
     * Create or update a collection item.
     * @param data Item item to create.
     * @return {Promise<Item>}
     */
    create(data: Item): Promise<Item>;
    /**
     * Create or update a collection item.
     * @param data Item item to update.
     * @return {Promise<Item>}
     */
    update(data: Item): Promise<Item>;
    /**
     * get one collection item by uuid.
     * @param id
     * @return {Promise<Item | null>}
     */
    getOne(id: uuid): Promise<Item | null>;
    /**
     * delete one collection item by uuid.
     * @param id
     * @return {Promise<any>}
     */
    deleteOne(id: uuid): Promise<uuid>;
    /**
     * get collection items from a list of id.
     * @param ids {Array<uuid>} array of id to get
     * @return {Promise<Iterator<Item>>} promise resole with an iterator of collection item
     */
    bulkGet(ids: Array<uuid>): Promise<Array<Item>>;
    /**
     * delete items from a list of id.
     * @param ids
     * @return {Promise<Array<uuid>>} promise resole with an array of deleted id
     */
    bulkDelete(ids: Array<uuid | undefined>): Promise<Array<uuid>>;
    /**
     * save an array of items
     * @param items
     * @return {Promise<Iterator<Item>>} promise resole with an iterator of collection item
     */
    bulkSave(items: Array<Item>): Promise<Array<Item>>;
    /**
     * Submit ozone search query
     */
    search(search: SearchQuery): SearchGenerator;
    /**
     *
     * @private
     */
    _readItemResponse: (res: ItemResponse) => Item;
    /**
     *
     * @private
     */
    _readBulkItemResponse: (res: BulkResponse) => Item[];
    /**
     *
     * @private
     */
    _postRequest(url: string, body: any, responseFilter: any): Promise<any>;
    /**
     *
     * @private
     */
    _getRequest(url: string): Promise<any>;
    /**
     *
     * @private
     */
    _deleteRequest(url: string): Promise<any>;
    /**
     *
     * @private
     */
    _buildUrl(action: string): string;
}
/**
 * return OzoneItemAPI singleton
 * @type {()=>OzoneItemAPI}
 */
export declare const getOzoneItemAPI: () => OzoneItemAPI;
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
export declare class SearchQuery {
    _searchRequest: SearchRequest;
    readonly searchQuery: string;
    size: number;
    offset: number;
    /**
     *
     * @param searchString
     */
    quicksearch(searchString: string): void;
    suggestion(searchString: string, lastTerm?: string): void;
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
export declare class SearchGenerator {
    searchParam: SearchQuery;
    url: string;
    total: number;
    ozoneAccess: IronAjax;
    offset: number;
    done: boolean;
    constructor(url: string, searchParam: SearchQuery, ozoneAccess: any);
    /**
     * load next array of results
     * @return {Promise<SearchResult>}
     */
    next(): Promise<SearchResult>;
    /**
     *
     * @private
     */
    _postRequest(url: string, body: string, responseFilter: any): Promise<any>;
    /**
     *
     * @private
     */
    _readSearchResponse(res: SearchResponse): SearchResult;
}
