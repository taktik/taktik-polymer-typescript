/**
 * Created by hubert on 8/06/17.
 */

/// <amd-module name="ozone-mosaic"/>
import {customElement, domElement} from 'decorators';
import {Item} from 'ozone-type';
import {OzoneItemAPI} from 'ozone-item-api';


export interface DomElements {
    ozoneApi:OzoneItemAPI
    scrollTheshold:{
        clearTriggers():void
    }
    mosaicCollection:any //TODO import
}

@customElement('ozone-mosaic')
export class OzoneMosaic  extends Polymer.Element{

    @domElement()
    $: DomElements;

    /**
     * id of the source
     */
    items: Array<Item>;

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
     * @notify true
     */
    dataRemain: boolean;

    /**
     * Item selected in the collection
     * @notify true
     */
    selectedItem: Item;

    static get properties() {
        return {
            /**
             * id of the source
             */
            items: {
                type: Array,
                notify: true,
                value: () =>  []
            },
            searchString: {
                type: String
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

    ready(){
        super.ready();
    }

    /**
     * trigger quickSearch in the collection
     * @param searchString
     */
    searchInItems(searchString:string){
        this.set('items', []);
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
}