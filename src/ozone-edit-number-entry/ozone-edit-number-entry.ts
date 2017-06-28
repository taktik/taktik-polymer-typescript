/**
 * Created by hubert on 23/06/17.
 */


/// <amd-module name="ozone-edit-integer-entry"/>

import {customElement} from 'decorators'
import {LocalizedString} from 'ozone-type'
import {OzoneEditEntry, OzoneEditEntryMixin, OzoneEditEntryConstructor} from 'ozone-edit-entry'
export interface DomElements {
    input: PolymerElement
   // Declare id: type of you dom elements
}

/**
 * <ozone-edit-number-entry> is an element to edit ozone items fields as number.
 *
 */

@customElement('ozone-edit-number-entry')
export class OzoneEditNumberEntry extends OzoneEditEntryMixin(Polymer.Element) {
    textValue:string;
    static get properties(){
        return {
            textValue:{
                type: String,
            },
        }
    }

    static get observers() {
        return [
            'valueChange(value)',
            'textChange(textValue)'
        ]
    }
    registerChangeListener (){
        // NOP prevent default behavior that listen on change event
    }

    textToNumber(textValue:string):Number| null{
        if(this.textValue == ''){
            return null;
        } else {
            return Number(textValue);
        }
    }


    isValueAndTextEqual():boolean{
        return this.textToNumber(this.textValue) == this.value;
    }

    valueChange () {
        if(! this.isValueAndTextEqual()){
            this.set('textValue', this.value);
        }
    }

    textChange () {
        if(! this.isValueAndTextEqual()){
            this.set('value', this.textToNumber(this.textValue));
            this.set('isModify', true);
        }
    }
}
