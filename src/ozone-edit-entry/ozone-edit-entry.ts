/**
 * Created by hubert on 23/06/17.
 */


/// <amd-module name="ozone-edit-entry"/>

import {customElement} from 'decorators'
import {LocalizedString} from 'ozone-type'
export interface DomElements {
    input: PolymerElement
}
export interface PaperInputBehavior extends PolymerElement{

}

/**
 * OzoneEditEntryBehavior is a generic interface to different items fields editor.
 */
export interface OzoneEditEntryBehavior extends PolymerElement{
    $: DomElements;

    /**
     * ozone type of the entry
     */
    type: string;

    /**
     * value of the field
     * @notify
     */
    value: any;

    /**
     * name of the field
     */
    name: LocalizedString;

    /**
     * computed label of the field
     */
    label: string;

    /**
     * language to use in LocalizedName
     */
    language: string;

    /**
     * field identifier
     */
    identifier: string;

    /**
     * Set to true to disable this input.
     * @value false
     */
    disabled: boolean;

    /**
     * if the value is modify, is value will change to true.
     * @value false
     * @notify
     */
    isModify:boolean;

    /**
     * accessor to PaperInputBehavior element
     */
    inputElement: PaperInputBehavior;
}


export interface OzoneEditEntryConstructor {
    new (): OzoneEditEntryBehavior;
}
export interface OzoneEditEntryMixinType {
    (parentClass: PolymerElementConstructor):OzoneEditEntryConstructor
}

/**
 * Polymer Mixin for OzoneEditEntry.
 * demo: ```javaScript
 * export class MyOwnOzoneEdit extends OzoneEditEntryMixin(Polymer.Element) {}
 * ```
 * @type {OzoneEditEntryMixinType}
 */
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
        label: string;

        static get properties(){
            return {
                name:{
                    type: String,
                },
                language:{
                    type: String,
                },
                 label:{
                    type: String,
                    computed: "toLabel(name, language)"
                },
                type:{
                    type: String,
                },
                value:{
                    type: Object,
                    notify: true
                },
                identifier:{
                    type: Object,
                },
                disabled:{
                    type: Boolean,
                    value: false,
                },
                isModify:{
                    type: Boolean,
                    value: false,
                    notify: true
                }
            }
        }

        toLabel(name: LocalizedString, language: string){
            if(name && name.strings && language) return name.strings[language];
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
/**
 * <ozone-edit-entry> is an element to edit ozone items fields as string.
 *
 * ```html
 * <ozone-edit-entry
 *      type="string"
 *      value={{someValue}}
 *      language="en"
 *      name="[[fieldName]]"
 *      ></ozone-edit-entry>
 * ```
 */
@customElement('ozone-edit-entry')
export class OzoneEditEntry extends OzoneEditEntryMixin(Polymer.Element) {

}

