/// <amd-module name="ozone-item-api"/>

/**
 * Created by hubert on 8/06/17.
 */

import {customElement, domElement} from 'decorators'
import {Item} from 'ozone-type'
import {SearchGenerator, SearchQuery} from 'ozone-search-helper'

export interface DomElements {
    ozoneAccess:IronAjax,
}
export interface BulkResponse {
    response:Array<Item>;
}

export interface ItemResponse {
    response:Item;
}

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

    /**
     * observer on collection
     * @private
     */
    _collectionChange(collection: string, endpoints: any): void{

        if(collection && endpoints.value && this.config){
            this.computeServiceUrl(endpoints.value[collection]);
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

    upload (file: File, folderId:string):Promise<string>{
        return this._startUploadSession(file, folderId)
            .then(this._getUploadId.bind(this))
            .then(this._performUpload.bind(this))
            .then(this._endUploadSession.bind(this))
            .then((mediaId:string)=>{
                console.log("upload session complete", mediaId);
                return mediaId
            })
    }

    _startUploadSession(file: File, folderId:string):Promise<any> {
        const numeric_id = parseInt('0x' + folderId.split('-')[4]);
        const body = {
            mediaUploadChannelIdentifier: 'uploadChannel1',
            autoCommit: false,
            mediaMetadatas: [{
                "type": {
                    "type": "PROPERTY",
                    "identifier": "org.taktik.metadata.folderId"
                }
            }]
        };
        const url = this._buildUrl('uploadStart');
        return this._postRequest(url, body, (req)=>{
            return {
                file: file,
                sessionId: req.response.result
            }
        });
    }

    _getUploadId (data):Promise<any>  {
        const url = this._buildUrl('uploadId') + '/' + data.sessionId;
        return this._getRequest(url).then( (response)=>{
            data.uploadId = response.result;
            return data;
        })
    }

    _performUpload(data):Promise<any> {

        var form = new FormData()
        form.append('files', data.file)
        const url =  this._buildUrl('upload')  + '/' + data.uploadId;
        return this._postRequest(url, form, (req)=>{
            return data
        })
    }

    _endUploadSession(data):Promise<any>  {

        return new Promise((resolve, reject)=>{
            const url = this._buildUrl('uploadComplete');
            const body = {
                selectedFileFieldNames: [["files"]]
            };
            return this._postRequest(url, body, (req)=>{
                this.waitForTask(req.response.files).then((data)=>{

                    //resolve(data)
                    this.waitForTask(data.secondaryTaskId).then(()=>{
                        resolve(data.mediaId)
                    })
                })
            })
        });
    }

    waitForTask(taskId:string, pollInterval:number = 500):Promise<any>{
        var tid = taskId;


        return new Promise((resolve, reject)=>{
            var interval = setInterval(()=>{
                this.awaitTask(taskId)
                    .then((data)=>{
                        if (data.taskExecutions[taskId].isComplete) {
                            clearInterval(interval);
                            if (data.taskExecutions[taskId].taskResult){
                                resolve({
                                    mediaId: data.taskExecutions[taskId].taskResult.mediaId,
                                    secondaryTaskId: data.taskExecutions[taskId].taskResult.asyncTasksGroupId
                                })
                            }
                            else {
                                resolve(true)
                            }
                        }
                })
                .catch((error)=>{
                    clearInterval(interval);
                    throw error;
                })
            }, pollInterval)
        });

    }

    awaitTask (taskId:string): Promise<any>{
        const url = this._buildUrl('wait') + '/' + taskId + '/' + 120;
        return this._getRequest(url);
    }

    /**
     *
     * @private
     */
    _readItemResponse = (res:ItemResponse) => res.response;

    /**
     *
     * @private
     */
    _readBulkItemResponse =  (res:BulkResponse):Array<Item> => {
        return res.response;
    };

    /**
     *
     * @private
     */
    _postRequest(url:string, body:any, responseFilter:any): Promise<any> {
        this.$.ozoneAccess.url = url;
        this.$.ozoneAccess.method = 'POST';
        this.$.ozoneAccess.body = JSON.stringify(body);
        return this.$.ozoneAccess
            .generateRequest().completes.then(responseFilter.bind(this))
    }

    /**
     *
     * @private
     */
    _getRequest(url:string): Promise<any> {
        this.$.ozoneAccess.url = url;
        this.$.ozoneAccess.method = 'GET';
        return this.$.ozoneAccess
            .generateRequest().completes.then((res:any) => res.response)
    }

    /**
     *
     * @private
     */
    _deleteRequest(url:string): Promise<any> {
        this.$.ozoneAccess.url = url;
        this.$.ozoneAccess.method = 'DELETE';
        return this.$.ozoneAccess
            .generateRequest().completes.then((res:any) => res.response)
    }

    /**
     *
     * @private
     */
    _buildUrl(action:string):string{
        return `${this.serviceUrl}/${action}`;
    }



}

function OzoneItemAPIGenerator() {
    let ozoneItemAPI;

    return ():OzoneItemAPI => {
        if (!document.querySelector('#ozoneItemAPI')) {
            ozoneItemAPI = document.createElement('ozone-item-api');
            ozoneItemAPI.id = 'ozoneItemAPI';
            document.body.appendChild(ozoneItemAPI);
        }
        return document.querySelector('#ozoneItemAPI') as OzoneItemAPI;
    }
}
/**
 * return OzoneItemAPI singleton
 * @type {()=>OzoneItemAPI}
 */
export const getOzoneItemAPI = OzoneItemAPIGenerator();
getOzoneItemAPI();
