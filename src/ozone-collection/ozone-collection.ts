/**
 * Created by hubert on 8/06/17.
 */
import {customElement, domElement} from 'decorators';
import {Item} from 'ozone-type';
import {OzoneItemAPI, SearchGenerator, SearchQuery} from 'ozone-item-api';


export interface DomElements {
    ozoneApi:OzoneItemAPI
    scrollTheshold:{
        clearTriggers():void
    }
}

@customElement('ozone-collection')
export class OzoneCollection  extends Polymer.Element{

    @domElement()
    $: DomElements;

    //@property()
    sourceId: string;

    //@property()
    source: OzoneItemAPI | null;

    //@property()
    items: Array<Item>;

    itemsIterator: SearchGenerator;

    static get properties() {
        return {
            /**
             * id of the source
             */
            sourceId: {
                type: String,
                observer: "_updateSource"
            },
            source: {
                type: Object
            },
            items: {
                type: Array,
                notify: true,
                value: () =>  []
            },
            itemsIterator:{
                type:Object
            }
        }
    }


    _updateSource(sourceId: string){
        if(! (this.parentNode == null)) {
            this.source = this.parentNode.querySelector(`#${this.sourceId}`) as OzoneItemAPI;
        }
    }

    loadItems(size:number){
        this.quickSearch('', size);
    }

    quickSearch(searchString:string, size?:number){
        size = size || 10;
        let searchQuery = new SearchQuery();
        searchQuery.quicksearch(searchString);
        this.search(searchQuery);
    }

    search(searchQuery:SearchQuery){
        this._verifySource();
        this.itemsIterator = this.source.search(searchQuery);
        this.loadNextItems()
    }

    loadNextItems(){
        if(this.itemsIterator) {
            return this.itemsIterator.next().then((searchResult)=>{
                searchResult.results.forEach((item)=>{
                    this.push('items', item);
                })
            });
        }
        return Promise.reject('itemsIterator not define you probably did not search for items')
    }

    findOne(id:uuid):Promise<Item | undefined>{
        try {
            this.isDefined(id);

            const index = this.getIndexById(id);
            let result;
            if (index < 0) {
                this._verifySource();
                result = this.source.getOne(id)
                    .then(item => {
                        if (item) {
                            this.push('items', item);
                        }
                        return item;
                    });
            } else {
                result = Promise.resolve(this.items[index]);
            }
            return result
        } catch (err) {
            return Promise.reject(err)
        }
    }

    private isDefined(param: any) {
        if (!param) throw new TypeError('parameter is undefined');
    }

    saveAll():Promise<any>{
        try {
            this._verifySource();
            return this.source.bulkSave(this.items)
                .then(items => {
                    this.set('items', items);
                    return items;
                })
        } catch (err){
            return Promise.reject(err);
        }
    }

    getIndexById(id?:uuid):number{
        let index = -1;
        if (id){
            index = this.items.findIndex(item => item.id == id)
        }
        return index;
    }

    /**
     *
     * @param item
     * @return {Promise<number>}
     */
    saveOne(item:Item):Promise<number>{
        try {
            this.isDefined(item);
            const index = this.getIndexById(item.id);
            let result;
            if (index > -1) {
                this._verifySource();
                result = this.source.update(item)
                    .then(item => {
                        this.items[index] = item;
                        this.notifyPath('items');
                        return index;
                    })
            } else {
                result = this.add(item);
            }
            return result;
        } catch (err){
            return Promise.reject(err);
        }
    }

    /**
     * Create a new item in the collection
     * @param item
     * @return {Promise<number>} promise the resolve with the index in items
     */
    add(item:Item, reflect:boolean=true):Promise<number>{
        try {
            this.isDefined(item);
            this._verifySource();
            return this.source.create(item)
                .then(item => {
                    if(reflect) {
                        this.push('items', item);
                    }
                    return this.items.length - 1;
                });
        } catch (err){
            return Promise.reject(err)
        }
    }

    deleteAll(reflect:boolean=true):Promise<any>{
        try {
            this._verifySource();
            const ids = this.items.map(item => item.id);
            return this.source.bulkDelete(ids)
                .then(() => {
                    if(reflect) {
                        this.set('items', []);
                    }
                });
        } catch (err){
            return Promise.reject(err);
        }
    }

    deleteItems(ids:Array<uuid>, reflect:boolean=true){
        try {
            this.isDefined(ids);
            this._verifySource();
            this._verifySource();
            return this.source.bulkDelete(ids)
                .then((ids)=>{
                    if(reflect) {
                        ids.map(id => {
                            this._removeOne(id);
                        });
                    }

                });
        } catch (err){
            return Promise.reject(err);
        }
    }

    deleteOne(id:uuid, reflect:boolean=true){
        try {
            this.isDefined(id);
            this._verifySource();
            return this.source.deleteOne(id)
                .then((id)=>{
                    if(reflect) {
                        this._removeOne(id);
                    }
                });
        } catch (err){
            return Promise.reject(err);
        }
    }

    _removeOne (id:uuid) {
        const index = this.getIndexById(id);
        if (index > -1 ){
            this.splice('items', index, 1);
        }
    }

    _verifySource() {
        if(!this.source){
            throw new Error('Invalid source')
        }
    }
}