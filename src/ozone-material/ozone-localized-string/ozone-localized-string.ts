/// <amd-module name="ozone-material/ozone-localized-string/ozone-localized-string"/>
import {customElement} from 'decorators'
import {LocalizedString} from "ozone-type";

/**
 * <localize-name> is an element to display an ozone localize-name.
 *
 * ```html
 * <localize-name language=en  data="[[localizeName]]"></localize-name>
 * ```
 */
@customElement('ozone-localized-string')
export class LocalizedStringDisplay extends Polymer.Element{

    /**
     * data to display
     */
    data: LocalizedString;

    /**
     * language key used to display the name
     */
    language: string;

    /**
     * language default key to use is the selected language is not available.
     */
    defaultLanguage: string;

    /**
     * displayed string
     * @notify
     */
    displayString: string;

    static get properties() {
        return {
            data: {
                type: Object
            },
            language:{
                type: String,
            },
            defaultLanguage:{
                type: String,
            },
            displayString: {
                type: String,
                notify: true
            },

        }
    }

    static get observers() {
        return ['_changes(data, language)'];
    }

    /**
     *
     * @private
     */
    _changes(data: LocalizedString, language: string) {
        if(data && data.strings) {
            if(data.strings.hasOwnProperty(language)) {
                this.set('displayString', data.strings[language])
            } else {
                this.set('displayString', data.strings[this.defaultLanguage])
            }
        }
    }

}

