/**
 * Created by hubert on 23/06/17.
 */
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
define("ozone-media-edit", ["require", "exports", "decorators", "ozone-media-url", "ozone-item-abstract-view", "taktik-clappr-wrapper"], function (require, exports, decorators_1, ozone_media_url_1, ozone_item_abstract_view_1, taktik_clappr_wrapper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * <ozone-media-edit> is an element that provide material design to edit an media Item.
     *
     * ```html
     *  <link rel="import" href="../ozone-media-edit/ozone-media-edit.html">
     *      ...
     *  <ozone-media-edit item-data={{item}}>  </ozone-media-edit>
     * ```
     */
    let OzoneMediaEdit = OzoneMediaEdit_1 = class OzoneMediaEdit extends ozone_item_abstract_view_1.OzoneItemAbstractView(Polymer.Element) {
        ready() {
            super.ready();
        }
        static get properties() {
            return {
                hidden: {
                    type: Boolean,
                    value: false,
                    observer: 'visibilityChange'
                },
                isVideo: {
                    type: Boolean,
                    value: false,
                },
                player: {
                    type: Object,
                    value: false,
                },
            };
        }
        visibilityChange() {
            if (this.hidden && this.player) {
                this.player.pause();
            }
        }
        dataChange(data) {
            const _super = name => super[name];
            return __awaiter(this, void 0, void 0, function* () {
                if (!data) {
                    return;
                }
                if (!data.hasOwnProperty('type')) {
                    return;
                }
                this.removeEntryIfExist();
                const fields = yield (this.ozoneTypeApi.getAllFields(data.type));
                const permission = yield (this.ozoneTypeApi.getPermissions(fields, data.id || ''));
                fields.sort((a, b) => { return a.fieldType.localeCompare(b.fieldType); });
                for (let description of fields) {
                    if (description) {
                        yield (this.addInputElement(description, data, permission));
                    }
                }
                yield (_super("loadImage").call(this, data, ozone_media_url_1.OzonePreviewSize.Medium));
                yield (this.loadVideo(data));
            });
        }
        addInputElement(description, data, permission) {
            return __awaiter(this, void 0, void 0, function* () {
                const fieldType = description.fieldType || "unknown";
                const identifier = description.identifier;
                const fieldName = description.name || { strings: { en: identifier + '*' } };
                const listEntry = document.createElement('div');
                listEntry.className = 'ozoneEditItemContent';
                const editableItemName = this.getEditableItemName(fieldType);
                if (typeof (editableItemName) == 'string') {
                    const editableItem = document.createElement(editableItemName);
                    editableItem.className = OzoneMediaEdit_1.editEntryClass;
                    editableItem.id = identifier;
                    editableItem.type = fieldType;
                    editableItem.value = data[identifier];
                    editableItem.language = 'en';
                    editableItem.name = fieldName;
                    const isEditAllow = permission.isFieldEditable(identifier);
                    editableItem.disabled = !isEditAllow;
                    listEntry.appendChild(editableItem);
                    this.$.editableList.appendChild(listEntry);
                    editableItem.inputElement.addEventListener('value-changed', (d) => {
                        this.dispatchEvent(new CustomEvent('value-changed', { bubbles: true, composed: true }));
                    });
                }
            });
        }
        getEditableItemName(type) {
            let editableItemName;
            switch (type) {
                case 'string':
                case 'date':
                    editableItemName = 'ozone-edit-entry';
                    break;
                case 'set<string>':
                    editableItemName = 'ozone-edit-set-entry';
                    break;
                case 'analyzed_string':
                case 'blob':
                    editableItemName = 'ozone-edit-text-entry';
                    break;
                case 'integer':
                case 'float':
                case 'double':
                    editableItemName = 'ozone-edit-number-entry';
                    break;
            }
            return editableItemName;
        }
        /**
         * get the item with it's modifies fields.
         * @return {Item}
         */
        getUpdatedData() {
            const entryList = this.getEntryList();
            const updatedItem = {
                type: this.itemData.type,
                id: this.itemData.id,
            };
            for (let index = 0; index < entryList.length; index++) {
                let entry = entryList.item(index);
                if (entry.isModify) {
                    updatedItem[entry.id] = entry.value;
                }
            }
            return updatedItem;
        }
        getEntryList() {
            return this.$.editableList.getElementsByClassName(OzoneMediaEdit_1.editEntryClass);
        }
        removeEntryIfExist() {
            const entryList = this.$.editableList.getElementsByClassName('ozoneEditItemContent');
            while (entryList.length > 0) {
                entryList[0].remove();
            }
            if (this.player) {
                this.player.destroy();
            }
            this.set('isVideo', false);
        }
        loadVideo(data) {
            return __awaiter(this, void 0, void 0, function* () {
                const ClapprWrapper = taktik_clappr_wrapper_1.getPlayer();
                if (this.ozoneTypeApi && data && ClapprWrapper) {
                    if (yield (this.ozoneTypeApi.ifIsTypeInstanceOf(data.type, 'video'))) {
                        const mediaUrl = new ozone_media_url_1.MediaUrl(data.id, this.ozoneTypeApi.config);
                        const url = mediaUrl.getVideoUrl();
                        this.player = new ClapprWrapper.Player({
                            source: url,
                            poster: this.previewImage,
                        });
                        var playerElement = document.createElement('div');
                        this.$.player.appendChild(playerElement);
                        this.player.attachTo(playerElement);
                        this.set('isVideo', true);
                    }
                }
            });
        }
    };
    OzoneMediaEdit.editEntryClass = 'editEntry';
    OzoneMediaEdit = OzoneMediaEdit_1 = __decorate([
        decorators_1.customElement('ozone-media-edit')
    ], OzoneMediaEdit);
    exports.OzoneMediaEdit = OzoneMediaEdit;
    var OzoneMediaEdit_1;
});
