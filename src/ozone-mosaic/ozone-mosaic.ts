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

    static get properties() {
        return {
            /**
             * id of the source
             */
            items: {
                type: Array,
                notify: true,
                value: () =>  []
            }
        }
    }

    searchInItems(searchString:string){
        this.$.mosaicCollection.searchInItems(searchString);
    }

    toggleThreshold(){
        this.$.mosaicCollection.loadNextItems();
        this.$.scrollTheshold.clearTriggers();
    }
}