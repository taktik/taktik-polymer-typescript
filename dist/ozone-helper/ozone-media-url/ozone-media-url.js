/// <amd-module name="ozone-media-url"/>
/**
 * Created by hubert on 21/06/17.
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
define("ozone-media-url", ["require", "exports", "decorators"], function (require, exports, decorators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let OzonePreviewSize = class OzonePreviewSize {
    };
    OzonePreviewSize.Small = 250;
    OzonePreviewSize.Medium = 500;
    OzonePreviewSize.Large = 1500;
    OzonePreviewSize = __decorate([
        decorators_1.jsElement()
    ], OzonePreviewSize);
    exports.OzonePreviewSize = OzonePreviewSize;
    /**
     * JavaScript class to convert media ID to URL
     */
    let MediaUrl = class MediaUrl {
        constructor(id, config) {
            this.id = id;
            this.config = config;
        }
        getNumericId() {
            return parseInt('0x' + this.id.split('-')[4]);
        }
        _buildBaseUrl(action) {
            return `${this.config.host}${this.config.view}/${action.join('/')}`;
        }
        getPreviewUrl(size) {
            const preview = 'org.taktik.filetype.image.preview.'
                + size;
            return this
                ._buildBaseUrl([this.getNumericId(), preview]);
        }
        getPreviewUrlPng(size) {
            const preview = 'preview.png.'
                + size;
            return this
                ._buildBaseUrl([this.getNumericId(), preview]);
        }
        getVideoUrl() {
            return this
                ._buildBaseUrl([this.getNumericId(),
                'org.taktik.filetype.flowr.video',
                'index.m3u8']);
        }
        getVideoUrlMp4() {
            return this
                ._buildBaseUrl([this.getNumericId(),
                'org.taktik.filetype.video.mp4']);
        }
    };
    MediaUrl = __decorate([
        decorators_1.jsElement(),
        __metadata("design:paramtypes", [String, Object])
    ], MediaUrl);
    exports.MediaUrl = MediaUrl;
});
