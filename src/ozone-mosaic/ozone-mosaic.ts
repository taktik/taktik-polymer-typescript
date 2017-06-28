/**
 * Created by hubert on 8/06/17.
 */

/// <amd-module name="ozone-mosaic"/>
import {customElement, domElement} from 'decorators';
import {Item} from 'ozone-type';
import {OzoneItemAPI} from 'ozone-item-api';
import {OzoneMediaEdit} from 'ozone-media-edit'
import {OzoneCollection} from 'ozone-collection'

export interface DomElements {
    ozoneApi:OzoneItemAPI
    scrollTheshold:{
        clearTriggers():void
    }
    mosaicCollection: OzoneCollection;
    mediaEditor: OzoneMediaEdit
}

/**
 * `TaktikSearchApiBehavior` defines standard behavior for search modules compatible with *taktik-free-text-search*.
 *
 * @polymerMixin
 */

export interface TaktikSearchApiBehavior{
    /**
     * searchString string for search query.
     */
    searchString: string;
    /**
     * Array of search results
     */
    searchResults: Array<any>;

    /**
     * If true, automatically performs an Ajax request when either *searchString*, *itemType* or *size* changes.
     */
    auto:boolean;

    /**
     * Fired when results are found by the API.
     *
     * @event results-found
     */
}
/**
 * <ozone-mosaic> is an element that display ozone items in a mosaic view.
 *
 * ```html
 * <ozone-mosaic item-data={{item}}>  </ozone-mosaic>
 * ```
 */
@customElement('ozone-mosaic')
export class OzoneMosaic  extends Polymer.Element implements  TaktikSearchApiBehavior{

    @domElement()
    $: DomElements;

    /**
     * id of the source
     */
    searchResults: Array<Item>;

    /**
     * string to search in the collection
     */
    searchString:string;

    /**
     * total number of items found with the search
     */
    total: number;

    /**
     * true indicate that all the data data still available with this search.
     */
    dataRemain: boolean;

    /**
     * Item selected in the collection
     * @notify true
     */
    selectedItem: Item;

    /**
     * unused in this implementation
     */
    auto: boolean;


    static get properties() {
        return {
            searchResults: {
                type: Array,
                notify: true,
                value: () =>  []
            },
            searchString: {
                type: String
            },
            selectedAction: {
                type: Number,
                value: 0,
            },
            total: {
                type: Number,
                notify:true
            },
            dataRemain:{
                type: Boolean,
                notify:true,
                value: false
            },
            selectedItem:{
                notify: true,
                type:Object
            }
        }
    }

    /**
     * trigger quickSearch in the collection
     * @param searchString
     */
    searchInItems(searchString:string){
        this.set('searchResults', []);
        this.$.mosaicCollection.quickSearch(searchString);
    }

    /**
     *
     */
    toggleThreshold(){
        this.$.mosaicCollection.loadNextItems()
            .catch(()=>{})
            .then(()=>{
                this.$.scrollTheshold.clearTriggers();
            });
    }

    /**
     *
     */
    requestSearch(){
        this.searchInItems(this.searchString);
    }

    saveSelectedItem(){
        const updatedData = this.$.mediaEditor.getUpdatedData();
        this.$.mosaicCollection.saveOne(updatedData).then((index:number)=>{
            this.set('selectedItem',  this.searchResults[index]);
        });
    }
}