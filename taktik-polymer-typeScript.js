"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <amd-module name="taktik-polymer-typeScript"/>
/**
 * A TypeScript class decorator that defines a custom element with name
 * `tagname` and the decorated class.
 */
require("reflect-metadata");
;
function customElement(tagname) {
    return function (clazz) {
        clazz.is = tagname;
        window[clazz.name] = clazz; // Register class in windows se that is can be use without IMD module loading.
        // Useful for import in pure JS project.
        window.customElements.define(tagname, clazz);
    };
}
exports.customElement = customElement;
/**
 * A TypeScript class decorator that declare a global class
 * `tagname` and the decorated class.
 */
function jsElement() {
    return function (clazz) {
        window[clazz.name] = clazz; // Register class in windows se that is can be use without IMD module loading.
        // Useful for import in pure JS project.
    };
}
exports.jsElement = jsElement;
;
/**
 * A TypeScript property decorator factory that defines this as a Polymer
 * property.
 *
 * This function must be invoked to return a decorator.
 */
function property(options) {
    return function (proto, propName) {
        var notify = (options && options.notify);
        var type = Reflect.getMetadata("design:type", proto, propName);
        var config = _ensureConfig(proto);
        config.properties[propName] = {
            type: type,
            notify: notify,
        };
    };
}
exports.property = property;
function domElement() {
    return function (proto, propName) {
    };
}
exports.domElement = domElement;
/**
 * A TypeScript property decorator factory that causes the decorated method to
 * be called when a property changes. `targets` is either a single property
 * name, or a list of property names.
 *
 * This function must be invoked to return a decorator.
 */
function observe(targets) {
    return function (proto, propName) {
        var targetString = typeof targets === 'string' ? targets : targets.join(',');
        var config = _ensureConfig(proto);
        config.observers.push(propName + "(" + targetString + ")");
    };
}
exports.observe = observe;
function _ensureConfig(proto) {
    var ctor = proto.constructor;
    if (ctor.hasOwnProperty('__polymer_ts_config')) {
        return ctor.__polymer_ts_config;
    }
    Object.defineProperty(ctor, 'config', {
        get: function () { return ctor.__polymer_ts_config; }
    });
    var config = ctor.__polymer_ts_config = ctor.__polymer_ts_config || {};
    config.properties = config.properties || {};
    config.observers = config.observers || [];
    return config;
}
