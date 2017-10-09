/**
 * A TypeScript class decorator that defines a custom element with name
 * `tagname` and the decorated class.
 */
import 'reflect-metadata'
import '../type/element'
import '../type/shadow'
import '../type/polymer'
import '../type/iron-ajax'
import '../type/missing'
declare interface ProjectWindow extends Window{
  [index:string] : any;
};
declare var window: ProjectWindow;

export function customElement(tagname: string) {
  return (clazz: any) => {
    clazz.is = tagname;
    window[clazz.name] = clazz; // Register class in windows se that is can be use without IMD module loading.
                                // Useful for import in pure JS project.
    window.customElements.define(tagname, clazz);
  }
}
/**
 * A TypeScript class decorator that declare a global class
 * `tagname` and the decorated class.
 */
export function jsElement() {
  return (clazz: any) => {
    window[clazz.name] = clazz; // Register class in windows se that is can be use without IMD module loading.
                                // Useful for import in pure JS project.
  }
}
/**
 * Options for the @property decorator.
 * See https://www.polymer-project.org/2.0/docs/devguide/properties.
 */
export interface PropertyOptions {
    /**
     * This field can be omitted if the Metadata Reflection API is configured.
     */
    type?: BooleanConstructor|DateConstructor|NumberConstructor|StringConstructor|
        ArrayConstructor|ObjectConstructor;
    notify?: boolean;
    reflectToAttribute?: boolean;
    readOnly?: boolean;
}

/**
 * A TypeScript property decorator factory that defines this as a Polymer
 * property.
 *
 * This function must be invoked to return a decorator.
 */
export function property(options?: PropertyOptions) {
    return (proto: any, propName: string): any => {
        const notify: boolean = options && options.notify || false;
        const reflectToAttribute: boolean =
            options && options.reflectToAttribute || false;
        const readOnly: boolean = options && options.readOnly || false;

        let type;
        if (options && options.hasOwnProperty('type')) {
            type = options.type;
        } else if (
            (window as any).Reflect && Reflect.hasMetadata && Reflect.getMetadata &&
            Reflect.hasMetadata('design:type', proto, propName)) {
            type = Reflect.getMetadata('design:type', proto, propName);
        } else {
            console.error(
                'A type could not be found for ${propName}. ' +
                'Set a type or configure Metadata Reflection API support.');
        }

        if (!proto.constructor.hasOwnProperty('properties')) {
            proto.constructor.properties = {};
        }
        proto.constructor.properties[propName] = {
            type,
            notify,
            reflectToAttribute,
            readOnly,
        };
    }
}

/**
 * A TypeScript property decorator factory that causes the decorated method to
 * be called when a property changes. `targets` is either a single property
 * name, or a list of property names.
 *
 * This function must be invoked to return a decorator.
 */
export function observe(targets: string|string[]) {
    return (proto: any, propName: string): any => {
        const targetString =
            typeof targets === 'string' ? targets : targets.join(',');
        if (!proto.constructor.hasOwnProperty('observers')) {
            proto.constructor.observers = [];
        }
        proto.constructor.observers.push(`${propName}(${targetString})`);
    }
}

/**
 * A TypeScript property decorator factory that converts a class property into
 * a getter that executes a querySelector on the element's shadow root.
 *
 * By annotating the property with the correct type, element's can have
 * type-checked access to internal elements.
 *
 * This function must be invoked to return a decorator.
 */
export const query = _query(
    (target: NodeSelector, selector: string) => target.querySelector(selector));

/**
 * A TypeScript property decorator factory that converts a class property into
 * a getter that executes a querySelectorAll on the element's shadow root.
 *
 * By annotating the property with the correct type, element's can have
 * type-checked access to internal elements. The type should be NodeList
 * with the correct type argument.
 *
 * This function must be invoked to return a decorator.
 */
export const queryAll = _query(
    (target: NodeSelector, selector: string) =>
        target.querySelectorAll(selector));

/**
 * Creates a decorator function that accepts a selector, and replaces a
 * property with a getter than executes the selector with the given queryFn
 *
 * @param queryFn A function that executes a query with a selector
 */
function _query(
    queryFn: (target: NodeSelector, selector: string) =>
        Element | NodeList | null) {
    return (selector: string) => (proto: any, propName: string): any => {
        Object.defineProperty(proto, propName, {
            get(this: HTMLElement) {
                return queryFn(this.shadowRoot!, selector);
            },
            enumerable: true,
            configurable: true,
        });
    };
