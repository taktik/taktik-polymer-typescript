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
export class OzoneItem  extends Polymer.Element{

    @domElement()
    $: DomElements;

    //@property()
    sourceId: string;

    //@property()
    source: OzoneItemAPI | null;

    //@property()
    //@property()
    diplayType: string;

    //@property()
    items: string;

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
            diplayType: {
                type: String,
                observer: "_updateSource"
            },
            items: {
                type: Array,
                notify: true,
                value: () =>  []
            },
            itemsIterrrato:{
                type:Object
            }
        }
    }

    _updateSource(sourceId: string){
        this.source = document.querySelector(this.sourceId) as OzoneItemAPI;
    }

    searchItems(){
        let searchQuery = new SearchQuery();
        searchQuery.quicksearch('');

        this.itemsIterator = this.$.ozoneApi.search(searchQuery);

        this.loadNextItems()
    }

    loadNextItems(){
        if(this.itemsIterator) {
            this.itemsIterator.next().then((searchResult)=>{
                searchResult.results.forEach((item)=>{
                    this.push('items', item);
                })
            });
        }
    }

    toggelThreshold(){
        this.loadNextItems();
        this.$.scrollTheshold.clearTriggers();
    }
}