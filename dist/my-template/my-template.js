/**
 * Created by hubert on 23/06/17.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("my-template", ["require", "exports", "decorators"], function (require, exports, decorators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * <my-template> is a template module start an ozone polymer module.
     *
     * ```html
     * <my-template> Document usage with code example </my-template>
     * ```
     */
    let MyTemplate = class MyTemplate extends Polymer.Element {
        static get properties() {
            return {
                aAttribute: {
                    type: String,
                    notify: false,
                    value: 'hello'
                }
            };
        }
    };
    MyTemplate = __decorate([
        decorators_1.customElement('my-template')
    ], MyTemplate);
    exports.MyTemplate = MyTemplate;
});
