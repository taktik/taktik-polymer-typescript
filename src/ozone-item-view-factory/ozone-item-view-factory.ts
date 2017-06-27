/**
 * Created by hubert on 20/06/17.
 */

/// <amd-module name="ozone-view-factory"/>
import {customElement} from 'decorators'
import {Item} from "ozone-type";
import {OzoneItemView} from 'ozone-item-view'


export interface DomElements {
}

/**
 * `ozone-item-view-factory` is a factory to generate ozone-item-view and added to the dom.
 *
 * Example:
 * ```html
 *  <ozone-item-view-factory item="[[selectedItem]]"></ozone-item-view-factory>
 * ```
 *
 */
@customElement('ozone-item-view-factory')
export class OzoneItemViewFactory extends Polymer.Element{

    $: DomElements;
    /**
     * item to display
     */
    item: Item;

    type:string;

    static get properties() {
        return {
            item: {
                type: Object,
                observer:'_itemChange'
            }
        }
    }

    _itemChange(item?: Item){
        if(item) {
            this.removeEntry();
            this.createEntry(item, item.type)
        }
    }

    removeEntry(){
        const ozoneViewContent = this.root.querySelector('#ozoneViewContent');
        if(ozoneViewContent) {
            this.root.removeChild(ozoneViewContent);
        }
    }

    createEntry(data: Item, type: string){
        var toLocal = document.createElement('ozone-item-view') as OzoneItemView;
        toLocal.id = 'ozoneViewContent'
        toLocal.className = type;
        toLocal.itemData = data;
        this.root.appendChild(toLocal);

    }

}

