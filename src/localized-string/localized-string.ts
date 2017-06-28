/**
 * Created by hubert on 20/06/17.
 */


import {customElement} from 'decorators'
import {LocalizedString} from "ozone-type";
import {LanguageSelection} from 'language-selection';

@customElement('localized-string')
export class LocalizedStringDisplay extends Polymer.Element{

    data: LocalizedString;
    language: string;
    languageSelectionId: string;
    _languageSelection: LanguageSelection;

    static get properties() {
        return {
            data: {
                type: Object
            },
            language:{
                type: String,
            },
            displayString: {
                type: String,
                notify: true
            },
            languageSelectionId:{
                type: String,
                value: 'languageSelection',
                observer: '_languageSelectionChange'
            },
            _languageSelection:{
                type: Object
            }

        }
    }

    _languageSelectionChange(){
        this._languageSelection = document.querySelector(`#${this.languageSelectionId}`) as LanguageSelection;
        if(this._languageSelection){
            this.set('language', this._languageSelection.currentLanguage);
            this._languageSelection.addEventListener('current-language-change', (event:any) => {
                this.set('language', event.detail.currentLanguage);
            });
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
                this.set('displayString', data.strings[this._languageSelection.defaultLanguage])
            }
        }
    }

}

