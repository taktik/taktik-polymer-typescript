/**
 * Created by hubert on 8/06/17.
 */
/// <amd-module name="ozone-item-abstract-view"/>
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
define("ozone-item-abstract-view", ["require", "exports", "decorators", "ozone-api-type", "ozone-media-url"], function (require, exports, taktik_polymer_typeScript_1, ozone_api_type_1, ozone_media_url_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * `OzoneItemAbstractView` is an abstract class for item view.
     * It provide ozoneTypeApi and an observer on the itemData.
     *
     * Example in javaScript:
     * ```javaScript
     *         class OzoneItemPreview extends OzoneItemAbstractView(Polymer.Element){
     *          //place your code here
     *         }
     * ```
     */
    exports.OzoneItemAbstractView = Polymer.dedupingMixin(function (superClass) {
        let OzoneItemAbstractViewClass = class OzoneItemAbstractViewClass extends superClass {
            static get properties() {
                return {
                    itemData: {
                        type: Object,
                        notify: true,
                        value: () => ({})
                    },
                    ozoneTypeApi: {
                        type: Object
                    },
                    previewImage: {
                        type: String,
                    }
                };
            }
            static get observers() {
                return [
                    'dataChange(itemData)'
                ];
            }
            connectedCallback() {
                this.ozoneTypeApi = ozone_api_type_1.getOzoneApiType();
                super.connectedCallback();
            }
            /**
             * observer function on itemData.
             * Overwrite this function in child implementation
             * @abstract
             * @param {Item} data
             */
            dataChange(data) {
            }
            loadImage(data, size) {
                return __awaiter(this, void 0, void 0, function* () {
                    size = size || ozone_media_url_1.OzonePreviewSize.Small;
                    if (this.ozoneTypeApi && data) {
                        if (yield (this.ozoneTypeApi.ifIsTypeInstanceOf(data.type, 'media'))) {
                            const mediaUrl = new ozone_media_url_1.MediaUrl(data.id, this.ozoneTypeApi.config);
                            this.set('previewImage', mediaUrl.getPreviewUrlPng(size));
                        }
                        else {
                            //TODO define preview
                            this.set('previewImage', undefined);
                        }
                    }
                });
            }
        };
        OzoneItemAbstractViewClass = __decorate([
            taktik_polymer_typeScript_1.customElement('ozone-item-abstract-view')
        ], OzoneItemAbstractViewClass);
        return OzoneItemAbstractViewClass;
    });
});
