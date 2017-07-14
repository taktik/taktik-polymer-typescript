/**
 * Created by hubert on 8/06/17.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define("ozone-mosaic", ["require", "exports", "decorators"], function (require, exports, taktik_polymer_typeScript_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * <ozone-mosaic> is an element that display ozone items in a mosaic view.
     *
     * ```html
     * <ozone-mosaic item-data={{item}}>  </ozone-mosaic>
     * ```
     *
     *  ### Events
     *
     * * *results-found* Fired when results are found by the API.
     *
     * ### Implements
     *
     *  *TaktikSearchApiBehavior*
     */
    let OzoneMosaic = class OzoneMosaic extends Polymer.Element {
        static get properties() {
            return {
                searchResults: {
                    type: Array,
                    notify: true,
                    value: () => []
                },
                searchString: {
                    type: String
                },
                selectedAction: {
                    type: Number,
                    value: 0,
                },
                total: {
                    type: Number,
                    notify: true
                },
                dataRemain: {
                    type: Boolean,
                    notify: true,
                    value: false
                },
            };
        }
        /**
         * trigger quickSearch in the collection
         * @param searchString
         */
        searchInItems(searchString) {
            this.set('searchResults', []);
            this.$.mosaicCollection.quickSearch(searchString, 50);
        }
        /**
         *
         */
        toggleThreshold() {
            this.$.mosaicCollection.loadNextItems()
                .catch(() => { })
                .then(() => {
                this.$.scrollTheshold.clearTriggers();
            });
        }
        /**
         * start a new search base on -searchString-.
         */
        requestSearch() {
            this.searchInItems(this.searchString);
        }
        /**
         * Save given item.
         * @param {Item} updatedData
         * @return {Promise<Item>}
         */
        saveSelectedItem(updatedData) {
            if (updatedData) {
                return this.$.mosaicCollection.saveOne(updatedData).then((index) => {
                    return this.searchResults[index];
                });
            }
            else {
                return Promise.reject('updatedData is null');
            }
        }
    };
    __decorate([
        taktik_polymer_typeScript_1.domElement(),
        __metadata("design:type", Object)
    ], OzoneMosaic.prototype, "$", void 0);
    OzoneMosaic = __decorate([
        taktik_polymer_typeScript_1.customElement('ozone-mosaic')
    ], OzoneMosaic);
    exports.OzoneMosaic = OzoneMosaic;
});
