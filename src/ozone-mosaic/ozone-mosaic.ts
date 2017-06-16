/**
 * Created by hubert on 8/06/17.
 */
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

    //@property()
    items: Array<Item>;

    searchString:string

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
            /**
             * string to search in the collection
             */
            searchString: {
                type: String
            },
            /**
             * total number of items found with the search
             */
            total: {
                type: Number,
                notify:true
            },
            /**
             * true indicate that all the data data still available with this search.
             */
            dataRemain:{
                type: Boolean,
                notify:true,
                value: false
            }
        }
    }

    ready(){
        super.ready();
        this.$.ozoneApi.addEventListener('configured', e => {

            //this.$.mosaicCollection.loadItems();
        });
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