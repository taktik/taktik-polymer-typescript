/**
 * Created by hubert on 23/06/17.
 */


/// <amd-module name="ozone-edit-text-entry"/>

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

@customElement('ozone-edit-text-entry')
export class OzoneEditTextEntry extends OzoneEditEntryMixin(Polymer.Element) {

}
