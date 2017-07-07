import { Item } from "ozone-type";
export interface DomElements {
}
/**
 * `ozone-item-view-factory` is a factory to generate ozone-item-view and added to the dom.
 *
 * Example:
 * ```html
 *  <ozone-item-view-factory item="[[selectedItem]]"></ozone-item-view-factory>
 * ```
 *
 */
export declare class OzoneItemViewFactory extends Polymer.Element {
    $: DomElements;
    /**
     * item to display
     */
    item: Item;
    type: string;
    static readonly properties: {
        item: {
            type: ObjectConstructor;
            observer: string;
        };
    };
    _itemChange(item?: Item): void;
    removeEntry(): void;
    createEntry(data: Item, type: string): void;
}
