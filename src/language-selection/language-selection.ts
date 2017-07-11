/// <amd-module name="language-selection"/>


import {customElement} from 'decorators'
/**
 * <language-selection> is a simple language selection module.
 *
 * ```html
 * <language-selection current-language="{{language}}" ></language-selection>
 * ```
 *
 * ### Events
 *
 * *current-language-change* Fired when language change.
 * This event will be fired if currentLanguage change.
 *
 */


@customElement('language-selection')
export class LanguageSelection extends Polymer.Element{

    /**
     * currentLanguage
     * @notify: true
     * @value: 'en'
     */
    currentLanguage: string;

    /**
     * list of availableLanguages
     * @notify: true
     * @value: ['en', 'fr']
     */
    availableLanguages:Array<string>;

    /**
     * defaultLanguage
     * @value: 'en'
     */
    defaultLanguage: string;

    static get properties() {
        return {
            currentLanguage: {
                type: String,
                notify: true,
                value: 'en',
                observer:'_currentLanguageChange'
            },
            defaultLanguage: {
                type: String,
                value: 'en',
            },

            availableLanguages:{
                type:Array,
                notify: true,
                value: ()=> ['en', 'fr']
            }
        }
    }

    /**
     * _currentLanguageChange
     * @param newLanguage
     * @private
     */
    _currentLanguageChange(newLanguage: string){
        this.dispatchEvent(new CustomEvent('current-language-change',
            {bubbles: true, composed: true, detail:{currentLanguage: newLanguage}}));
    }
}

