/// <amd-module name="ozone-edit-panel"/>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define("ozone-edit-panel", ["require", "exports", "decorators"], function (require, exports, decorators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * <ozone-edit-panel> is an element that display an ozone media edit in a panel.
     *
     * ```html
     * <ozone-edit-panel selected-item={{item}}>  <ozone-edit-panel>
     * ```
     *
     * ### Events
     *
     * * *close-tap* fire on click on close button.
     * * *save-tap* fire on click on save button.
     *
     */
    let OzoneEditPanel = class OzoneEditPanel extends Polymer.Element {
        static get properties() {
            return {
                selectedItem: {
                    type: Object,
                },
                display: {
                    type: Boolean,
                    value: false,
                }
            };
        }
        _closePanel() {
            this.dispatchEvent(new CustomEvent('close-tap', { bubbles: true }));
        }
        _save() {
            const updatedData = this.$.mediaEditor.getUpdatedData();
            this.dispatchEvent(new CustomEvent('save-tap', { bubbles: true, detail: updatedData }));
        }
    };
    __decorate([
        decorators_1.domElement(),
        __metadata("design:type", Object)
    ], OzoneEditPanel.prototype, "$", void 0);
    OzoneEditPanel = __decorate([
        decorators_1.customElement('ozone-edit-panel')
    ], OzoneEditPanel);
    exports.OzoneEditPanel = OzoneEditPanel;
});
