/// <amd-module name="ozone-item-api"/>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define("ozone-item-api", ["require", "exports", "decorators"], function (require, exports, decorators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    let OzoneItemAPI = class OzoneItemAPI extends OzoneApiAjaxMixin(Polymer.Element) {
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
        constructor() {
            super(...arguments);
            /**
             *
             * @private
             */
            this._readItemResponse = (res) => res.response;
            /**
             *
             * @private
             */
            this._readBulkItemResponse = (res) => {
                return res.response;
            };
        }
        static get properties() {
            return {
                collection: {
                    type: String,
                    notify: false,
                    value: 'item'
                }
            };
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
        /**
         * observer on collection
         * @private
         */
        _collectionChange(collection, endpoints) {
            if (collection && endpoints.value && this.config) {
                this.computeServiceUrl(endpoints.value[collection]);
                this.dispatchEvent(new CustomEvent('configured', { bubbles: true, composed: true }));
            }
        }
        /**
         * Create or update a collection item.
         * @param data Item item to create.
         * @return {Promise<Item>}
         */
        create(data) {
            return this.update(data);
        }
        /**
         * Create or update a collection item.
         * @param data Item item to update.
         * @return {Promise<Item>}
         */
        update(data) {
            const url = this._buildUrl('');
            return this._postRequest(url, data, this._readItemResponse);
        }
        /**
         * get one collection item by uuid.
         * @param id
         * @return {Promise<Item | null>}
         */
        getOne(id) {
            const url = this._buildUrl(id);
            return this._getRequest(url)
                .then(response => {
                if (response == '') {
                    return null;
                }
                else {
                    return response;
                }
            });
        }
        /**
         * delete one collection item by uuid.
         * @param id
         * @return {Promise<any>}
         */
        deleteOne(id) {
            const url = this._buildUrl(id);
            return this._deleteRequest(url);
        }
        /**
         * get collection items from a list of id.
         * @param ids {Array<uuid>} array of id to get
         * @return {Promise<Iterator<Item>>} promise resole with an iterator of collection item
         */
        bulkGet(ids) {
            const url = this._buildUrl('bulkGet');
            return this._postRequest(url, ids, this._readBulkItemResponse);
        }
        /**
         * delete items from a list of id.
         * @param ids
         * @return {Promise<Array<uuid>>} promise resole with an array of deleted id
         */
        bulkDelete(ids) {
            const url = this._buildUrl('bulkDelete');
            return this._postRequest(url, ids, this._readItemResponse);
        }
        /**
         * save an array of items
         * @param items
         * @return {Promise<Iterator<Item>>} promise resole with an iterator of collection item
         */
        bulkSave(items) {
            const url = this._buildUrl('bulkSave');
            return this._postRequest(url, items, this._readBulkItemResponse);
        }
        /**
         * Submit ozone search query
         */
        search(search) {
            const url = this._buildUrl('search');
            return new SearchGenerator(url, search, this.$.ozoneAccess);
        }
        /**
         *
         * @private
         */
        _postRequest(url, body, responseFilter) {
            this.$.ozoneAccess.url = url;
            this.$.ozoneAccess.method = 'POST';
            this.$.ozoneAccess.body = JSON.stringify(body);
            return this.$.ozoneAccess
                .generateRequest().completes.then(responseFilter.bind(this));
        }
        /**
         *
         * @private
         */
        _getRequest(url) {
            this.$.ozoneAccess.url = url;
            this.$.ozoneAccess.method = 'GET';
            return this.$.ozoneAccess
                .generateRequest().completes.then((res) => res.response);
        }
        /**
         *
         * @private
         */
        _deleteRequest(url) {
            this.$.ozoneAccess.url = url;
            this.$.ozoneAccess.method = 'DELETE';
            return this.$.ozoneAccess
                .generateRequest().completes.then((res) => res.response);
        }
        /**
         *
         * @private
         */
        _buildUrl(action) {
            return `${this.serviceUrl}/${action}`;
        }
    };
    __decorate([
        decorators_1.domElement(),
        __metadata("design:type", Object)
    ], OzoneItemAPI.prototype, "$", void 0);
    OzoneItemAPI = __decorate([
        decorators_1.customElement('ozone-item-api')
    ], OzoneItemAPI);
    exports.OzoneItemAPI = OzoneItemAPI;
    function OzoneItemAPIGenerator() {
        let ozoneItemAPI;
        return () => {
            if (!document.querySelector('#ozoneItemAPI')) {
                ozoneItemAPI = document.createElement('ozone-item-api');
                ozoneItemAPI.id = 'ozoneItemAPI';
                document.body.appendChild(ozoneItemAPI);
            }
            return document.querySelector('#ozoneItemAPI');
        };
    }
    /**
     * return OzoneItemAPI singleton
     * @type {()=>OzoneItemAPI}
     */
    exports.getOzoneItemAPI = OzoneItemAPIGenerator();
    exports.getOzoneItemAPI();
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
    let SearchQuery = class SearchQuery {
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
        constructor() {
            this._searchRequest = {
                size: 10
            };
        }
        get searchQuery() { return JSON.stringify(this._searchRequest); }
        get size() { return this._searchRequest.size || 0; }
        set size(size) { this._searchRequest.size = size; }
        get offset() { return this._searchRequest.offset || 0; }
        set offset(size) { this._searchRequest.offset = size; }
        /**
         *
         * @param searchString
         */
        quicksearch(searchString) {
            let searchParam = {};
            searchParam.size = this.size;
            searchParam.query = {
                "$type": "QueryStringQuery",
                "field": "_quicksearch",
                "queryString": `${searchString}*`
            };
            this._searchRequest = searchParam;
        }
        suggestion(searchString, lastTerm) {
            let searchParam = {};
            if (lastTerm) {
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
    };
    SearchQuery = __decorate([
        decorators_1.jsElement()
    ], SearchQuery);
    exports.SearchQuery = SearchQuery;
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
    let SearchGenerator = class SearchGenerator {
        constructor(url, searchParam, ozoneAccess) {
            this.offset = 0;
            this.done = false;
            this.searchParam = searchParam;
            this.url = url;
            this.ozoneAccess = ozoneAccess;
        }
        /**
         * load next array of results
         * @return {Promise<SearchResult>}
         */
        next() {
            this.searchParam.offset = this.offset;
            return this._postRequest(this.url, this.searchParam.searchQuery, this._readSearchResponse);
        }
        /**
         *
         * @private
         */
        _postRequest(url, body, responseFilter) {
            this.ozoneAccess.url = url;
            this.ozoneAccess.method = 'POST';
            this.ozoneAccess.body = body;
            return this.ozoneAccess
                .generateRequest().completes.then(responseFilter.bind(this));
        }
        /**
         *
         * @private
         */
        _readSearchResponse(res) {
            this.total = Number(res.response.total);
            this.offset += Number(res.response.size);
            this.done = this.offset < this.total;
            let results = res.response.results || [];
            return {
                results,
                total: this.total
            };
        }
    };
    SearchGenerator = __decorate([
        decorators_1.jsElement(),
        __metadata("design:paramtypes", [String, SearchQuery, Object])
    ], SearchGenerator);
    exports.SearchGenerator = SearchGenerator;
});
