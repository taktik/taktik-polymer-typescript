/**
 * Created by hubert on 8/06/17.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("ozone-item-preview", ["require", "exports", "decorators", "mediaUrl", "ozone-item-abstract-view"], function (require, exports, decorators_1, mediaUrl_1, ozone_item_abstract_view_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * `ozone-item-preview` is hight level polymer module to display preview information an ozone item.
     *
     * Example in html:
     * ```html
     * <ozone-item-preview itemData=[[item]]></ozone-item-view>
     * ```
     *
     */
    let OzoneItemPreview = OzoneItemPreview_1 = class OzoneItemPreview extends ozone_item_abstract_view_1.OzoneItemAbstractView(Polymer.Element) {
        static get properties() {
            return {
                previewImage: {
                    type: String
                }
            };
        }
        dataChange(data) {
            if (this.ozoneTypeApi) {
                this.ozoneTypeApi.ifIsTypeInstanceOf(data.type, 'media').then((isTypeInstanceOf) => {
                    if (isTypeInstanceOf) {
                        const mediaUrl = new mediaUrl_1.MediaUrl(data.id, this.ozoneTypeApi.config);
                        this.set('previewImage', mediaUrl.getPreviewUrl(mediaUrl_1.OzonePreviewSize.Small));
                    }
                    else {
                        this.set('previewImage', OzoneItemPreview_1.defaultImagePath);
                    }
                }).catch(() => {
                });
            }
            else {
                throw new Error('ozoneTypeApi is not define');
            }
        }
        getMinRatio() {
            const item = this.itemData;
            return item.previewRatio || 1;
        }
        setDesiredPreviewHeight(desiredPreviewHeight) {
            this.style.height = String(desiredPreviewHeight);
        }
        setMarginTop(margin) {
            this.style.marginTop = String(margin);
        }
        setMarginBottom(margin) {
            this.style.marginBottom = String(margin);
        }
        setMarginLeft(margin) {
            this.style.marginLeft = String(margin);
        }
        setMarginRight(margin) {
            this.style.marginRight = String(margin);
        }
        updateDisplay() { }
    };
    OzoneItemPreview.defaultImagePath = "http://icons.iconarchive.com/icons/custom-icon-design/mono-general-2/512/document-icon.png";
    OzoneItemPreview = OzoneItemPreview_1 = __decorate([
        decorators_1.customElement('ozone-item-preview')
    ], OzoneItemPreview);
    exports.OzoneItemPreview = OzoneItemPreview;
    var OzoneItemPreview_1;
});
