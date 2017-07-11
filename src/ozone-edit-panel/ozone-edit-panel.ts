/// <amd-module name="ozone-edit-panel"/>

import {customElement, domElement} from 'decorators';
import {Item} from 'ozone-type';
import {OzoneMediaEdit} from 'ozone-media-edit'

export interface DomElements {
    mediaEditor: OzoneMediaEdit;
}

/**
 * <ozone-edit-panel> is an element that display an ozone media edit in a panel.
 *
 * ```html
 * <ozone-edit-panel selected-item={{item}}>  <ozone-edit-panel>
 * ```
 *
 * ### Events
 *
 * - -close-tap- fire on click on close button.
 * - -save-tap- fire on click on save button.
 *
 */
@customElement('ozone-edit-panel')
export class OzoneEditPanel  extends Polymer.Element {

    @domElement()
    $: DomElements;

    /**
     * Item to edit
     */
    selectedItem: Item;



    static get properties() {
        return {
            selectedItem:{
                type:Object,
            },
            display:{
                type:Boolean,
                value: false,
            }
        }
    }

    _closePanel() {
        this.dispatchEvent(new CustomEvent('close-tap', {bubbles: true}));
    }

    _save(){
        const updatedData = this.$.mediaEditor.getUpdatedData();
        this.dispatchEvent(new CustomEvent('save-tap', {bubbles: true, detail: updatedData}));
    }
}

