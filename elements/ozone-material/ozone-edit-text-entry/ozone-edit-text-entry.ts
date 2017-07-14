/**
 * Created by hubert on 23/06/17.
 */


/// <amd-module name="ozone-edit-text-entry"/>

import {customElement} from 'taktik-polymer-typeScript'
import {LocalizedString} from 'ozone-type'
import {OzoneEditEntry, OzoneEditEntryMixin, OzoneEditEntryConstructor} from 'ozone-edit-entry'

/**
 * <ozone-edit-number-entry> is an element to edit ozone items fields as multi line text.
 *
 */
@customElement('ozone-edit-text-entry')
export class OzoneEditTextEntry extends OzoneEditEntryMixin(Polymer.Element) {
    $: {
        input: PolymerElement
    }
}
