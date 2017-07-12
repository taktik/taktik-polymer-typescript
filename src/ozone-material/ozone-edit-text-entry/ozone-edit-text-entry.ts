/**
 * Created by hubert on 23/06/17.
 */


/// <amd-module name="ozone-material/ozone-edit-text-entry/ozone-edit-text-entry"/>

import {customElement} from 'decorators'
import {LocalizedString} from 'ozone-type'
import {OzoneEditEntry, OzoneEditEntryMixin, OzoneEditEntryConstructor} from 'ozone-material/ozone-edit-entry/ozone-edit-entry'

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
