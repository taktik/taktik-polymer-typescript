/**
 * Created by hubert on 23/06/17.
 */


/// <amd-module name="ozone-edit-entry"/>

import {customElement} from 'decorators'
import {LocalizedString} from 'ozone-type'
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

export interface OzoneEditEntryInterface extends PolymerElement{
    $: DomElements;

    type: string;
    value: any;
    name: LocalizedString;
    language: any;
    identifier: string;
    disabled: boolean;
    isModify:boolean;

    inputElement: PolymerElement
}


export interface OzoneEditEntryConstructor {
    new (): OzoneEditEntryInterface;
}
export interface OzoneEditEntryMixinType {
    (parentClass: PolymerElementConstructor):OzoneEditEntryConstructor
}

export const OzoneEditEntryMixin:OzoneEditEntryMixinType = Polymer.dedupingMixin<any>(function(parentClass: PolymerElementConstructor){
    return class extends parentClass  {


        $: DomElements;

        type: string;
        value: any;
        name: LocalizedString;
        language: any;
        identifier: string;
        disabled: boolean;
        isModify:boolean;

        static get properties(){
            return {
                name:{
                    type: String,
                    notify: false
                },
                language:{
                    type: String,
                    notify: false
                },
                type:{
                    type: String,
                    notify: false
                },
                value:{
                    type: Object,
                    notify: true
                },
                identifier:{
                    type: Object,
                    notify: true
                },
                disabled:{
                    type: Boolean,
                },
                isModify:{
                    type: Boolean,
                    value: false,
                }
            }
        }

        /**
         * Returns a reference to the input element.
         */
        get inputElement() {
            return this.$.input;
        }

        connectedCallback (){
            super.connectedCallback ();
            setTimeout(()=>{this.registerChangeListener()}, 0)
        }

        registerChangeListener (){
            this.inputElement.addEventListener('value-changed', (event) => {
                this.changeListenerCallback(event)
            })
        }

        changeListenerCallback(event: Event){
            this.set('isModify', true);
        }
    }

});

@customElement('ozone-edit-entry')
export class OzoneEditEntry extends OzoneEditEntryMixin(Polymer.Element) {

}

