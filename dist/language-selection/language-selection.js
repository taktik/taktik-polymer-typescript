/**
 * Created by hubert on 20/06/17.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "decorators"], function (require, exports, decorators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * <language-selection> is a simple language selection module.
     * demo
     * ```html
     * <language-selection current-language="{{language}}" ></language-selection>
     * ```
     */
    let LanguageSelection = class LanguageSelection extends Polymer.Element {
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
         * Fired when language change.
         * This event will be fired if currentLanguage change.
         *
         * @event current-language-change
         */
        /**
         * _currentLanguageChange
         * @param newLanguage
         * @private
         */
        _currentLanguageChange(newLanguage) {
            this.dispatchEvent(new CustomEvent('current-language-change', { bubbles: true, composed: true, detail: { currentLanguage: newLanguage } }));
        }
    };
    LanguageSelection = __decorate([
        decorators_1.customElement('language-selection')
    ], LanguageSelection);
    exports.LanguageSelection = LanguageSelection;
});
