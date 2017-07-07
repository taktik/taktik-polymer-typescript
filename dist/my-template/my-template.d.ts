export interface DomElements {
}
/**
 * <my-template> is a template module start an ozone polymer module.
 *
 * ```html
 * <my-template> Document usage with code example </my-template>
 * ```
 */
export declare class MyTemplate extends Polymer.Element {
    $: DomElements;
    /**
     * Attribute declaration
     * Warning don't assign a value here!
     * Do it in get properties
     * @notify false
     * @value 'hello'
     */
    aAttribute: any;
    static readonly properties: {
        aAttribute: {
            type: StringConstructor;
            notify: boolean;
            value: string;
        };
    };
}
