/**
 * Created by hubert on 8/06/17.
 */
/// <amd-module name="ozone-item-view"/>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define("ozone-item-view", ["require", "exports", "decorators", "ozone-item-abstract-view", "mediaUrl"], function (require, exports, decorators_1, ozone_item_abstract_view_1, mediaUrl_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * `ozone-item-view` is hight level polymer module to display raw information an ozone item.
     *
     * Example in html:
     * ```html
     * <ozone-item-view itemData=[[item]] ozoneTypeApiId="DifferentOzoneTypeApi"></ozone-item-view>
     * ```
     *
     * Example in javaScript:
     * ```javaScript
     *         var toLocal = document.createElement('ozone-item-view') as OzoneItemView;
     *         toLocal.id = 'ozoneViewContent'
     *         toLocal.className = type;
     *         toLocal.itemData = data;
     *         // if you don't want to use the default API
     *         toLocal.ozoneTypeApi = this.parentNode.querySelector('#ozoneApiType') as OzoneTypeAPI;
     *         this.root.appendChild(toLocal);
     * ```
     */
    let OzoneItemView = class OzoneItemView extends ozone_item_abstract_view_1.OzoneItemAbstractView(Polymer.Element) {
        static get properties() {
            return {
                rawFields: {
                    type: Array,
                    notify: true,
                    value: () => ([])
                },
                previewImage: {
                    type: String
                }
            };
        }
        dataChange(data) {
            return __awaiter(this, void 0, void 0, function* () {
                let rawFields = [];
                let entries = this.orderEntries(data);
                for (let entry of entries) {
                    const description = yield (this.ozoneTypeApi.findFieldInCollection(data.type, entry));
                    let fieldType;
                    if (description && description.fieldType) {
                        fieldType = description.fieldType;
                    }
                    else {
                        fieldType = "unknown";
                    }
                    let fieldName = this.computeFieldName(entry, description);
                    this.push('rawFields', {
                        name: fieldName,
                        type: fieldType,
                        value: data[entry]
                    });
                }
                yield (this.loadImage(data, mediaUrl_1.OzonePreviewSize.Small));
            });
        }
        computeFieldName(entry, description) {
            let fieldName;
            if (description && description.name) {
                fieldName = description.name;
            }
            else {
                fieldName = { strings: { en: entry + '*' } };
                console.log(fieldName);
            }
            return fieldName;
        }
        orderEntries(data) {
            let entries = [];
            for (let entry in data) {
                entries.push(entry);
            }
            entries.sort();
            return entries;
        }
    };
    OzoneItemView = __decorate([
        decorators_1.customElement('ozone-item-view')
    ], OzoneItemView);
    exports.OzoneItemView = OzoneItemView;
});
