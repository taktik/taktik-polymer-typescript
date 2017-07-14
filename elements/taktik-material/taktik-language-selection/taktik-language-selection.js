/// <amd-module name="taktik-language-selection"/>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("taktik-language-selection", ["require", "exports", "decorators"], function (require, exports, taktik_polymer_typeScript_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * <taktik-language-selection> is a simple language selection module.
     *
     * ```html
     * <taktik-language-selection current-language="{{language}}" ></taktik-language-selection>
     * ```
     *
     * ### Events
     *
     * *current-language-change* Fired when language change.
     * This event will be fired if currentLanguage change.
     *
     */
    let TaktikLanguageSelection = class TaktikLanguageSelection extends Polymer.Element {
        static get properties() {
            return {
                currentLanguage: {
                    type: String,
                    notify: true,
                    value: 'en',
                    observer: '_currentLanguageChange'
                },
                defaultLanguage: {
                    type: String,
                    value: 'en',
                },
                availableLanguages: {
                    type: Array,
                    notify: true,
                    value: () => ['en', 'fr']
                }
            };
        }
        /**
         * _currentLanguageChange
         * @param newLanguage
         * @private
         */
        _currentLanguageChange(newLanguage) {
            this.dispatchEvent(new CustomEvent('current-language-change', { bubbles: true, composed: true, detail: { currentLanguage: newLanguage } }));
        }
    };
    TaktikLanguageSelection = __decorate([
        taktik_polymer_typeScript_1.customElement('taktik-language-selection')
    ], TaktikLanguageSelection);
    exports.TaktikLanguageSelection = TaktikLanguageSelection;
});
