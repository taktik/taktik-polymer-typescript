/**
 * Created by hubert on 20/06/17.
 */


import {customElement} from 'decorators'
import {LocalizedString} from "ozone-type";

@customElement('localized-string')
export class LocalizedStringDisplay extends Polymer.Element{

    data: LocalizedString;
    language: string;
    defaultLanguage: string;

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

