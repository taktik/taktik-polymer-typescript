/**
 * Created by hubert on 23/06/17.
 */


/// <amd-module name="ozone-edit-set-entry"/>

import {customElement} from 'taktik-polymer-typeScript'
import {LocalizedString} from 'ozone-type'
import {OzoneEditEntry, OzoneEditEntryMixin, OzoneEditEntryConstructor} from 'ozone-edit-entry'
/**
 * <ozone-edit-number-entry> is an element to edit ozone items fields as set<string>.
 *
 */

@customElement('ozone-edit-set-entry')
export class OzoneEditSetEntry extends OzoneEditEntryMixin(Polymer.Element) {
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
