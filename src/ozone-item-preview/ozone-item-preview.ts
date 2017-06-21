/**
 * Created by hubert on 8/06/17.
 */
import {customElement} from 'decorators'
import {Item} from 'ozone-type'

@customElement('ozone-item-preview')
export class OzoneItemPreview  extends Polymer.Element{

    //@property()
    itemData:Item;

    static get properties() {
        return {
            /**
             * item data
             */
            itemData: {
                type: Object,
                notify: true,
                value: () => ({})
            },
            itemId: {
                type: String,
                notify: true
            }
        }
    }

    static get observers() {
        return [
            '_dataChange(itemData)'];
    }

    _dataChange(data:any){

    }
}