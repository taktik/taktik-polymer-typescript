/**
 * Created by hubert on 20/06/17.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("ozone-view-factory", ["require", "exports", "decorators"], function (require, exports, decorators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * `ozone-item-view-factory` is a factory to generate ozone-item-view and added to the dom.
     *
     * Example:
     * ```html
     *  <ozone-item-view-factory item="[[selectedItem]]"></ozone-item-view-factory>
     * ```
     *
     */
    let OzoneItemViewFactory = class OzoneItemViewFactory extends Polymer.Element {
        static get properties() {
            return {
                item: {
                    type: Object,
                    observer: '_itemChange'
                }
            };
        }
        _itemChange(item) {
            if (item) {
                this.removeEntry();
                this.createEntry(item, item.type);
            }
        }
        removeEntry() {
            const ozoneViewContent = this.root.querySelector('#ozoneViewContent');
            if (ozoneViewContent) {
                this.root.removeChild(ozoneViewContent);
            }
        }
        createEntry(data, type) {
            var toLocal = document.createElement('ozone-item-view');
            toLocal.id = 'ozoneViewContent';
            toLocal.className = type;
            toLocal.itemData = data;
            this.root.appendChild(toLocal);
        }
    };
    OzoneItemViewFactory = __decorate([
        decorators_1.customElement('ozone-item-view-factory')
    ], OzoneItemViewFactory);
    exports.OzoneItemViewFactory = OzoneItemViewFactory;
});
