/**
 * Created by hubert on 23/06/17.
 */


/// <amd-module name="ozone-edit-set-entry"/>

import {customElement} from 'decorators'
import {LocalizedString} from 'ozone-type'
import {OzoneEditEntry, OzoneEditEntryMixin, OzoneEditEntryConstructor} from 'ozone-edit-entry'
export interface DomElements {
    input: PolymerElement
   // Declare id: type of you dom elements
}

/**
 * <my-template> is a template module start an ozone polymer module.
 *
 * ```html
 * <my-template> Document usage with code example </my-template>
 * ```
 */

@customElement('ozone-edit-set-entry')
export class OzoneEditTextEntry extends OzoneEditEntryMixin(Polymer.Element) {
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

    textToSet(textValue:string):Array<string>{
        return textValue.replace(/ /g, '').split(',');
    }

    setTotext(arrayValue:Array<string>):string{
        return arrayValue.join(', ')
    }

    isValueAndTextEqual():boolean{
        let textValue = this.textValue || '';
        let value = this.value || [];
        return this.textToSet(textValue).join() == value.join();
    }

    valueChange () {
        if(! this.isValueAndTextEqual()){
            this.set('textValue', this.setTotext(this.value));
        }
    }

    textChange () {
        if(! this.isValueAndTextEqual()){
            this.set('value', this.textToSet(this.textValue));
            this.set('isModify', true);
        }
    }


}
