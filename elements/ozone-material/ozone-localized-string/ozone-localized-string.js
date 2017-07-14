var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("ozone-localized-string", ["require", "exports", "decorators"], function (require, exports, taktik_polymer_typeScript_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * <localize-name> is an element to display an ozone localize-name.
     *
     * ```html
     * <localize-name language=en  data="[[localizeName]]"></localize-name>
     * ```
     */
    let LocalizedStringDisplay = class LocalizedStringDisplay extends Polymer.Element {
        static get properties() {
            return {
                data: {
                    type: Object
                },
                language: {
                    type: String,
                },
                defaultLanguage: {
                    type: String,
                },
                displayString: {
                    type: String,
                    notify: true
                },
            };
        }
        static get observers() {
            return ['_changes(data, language)'];
        }
        /**
         *
         * @private
         */
        _changes(data, language) {
            if (data && data.strings) {
                if (data.strings.hasOwnProperty(language)) {
                    this.set('displayString', data.strings[language]);
                }
                else {
                    this.set('displayString', data.strings[this.defaultLanguage]);
                }
            }
        }
    };
    LocalizedStringDisplay = __decorate([
        taktik_polymer_typeScript_1.customElement('ozone-localized-string')
    ], LocalizedStringDisplay);
    exports.LocalizedStringDisplay = LocalizedStringDisplay;
});
