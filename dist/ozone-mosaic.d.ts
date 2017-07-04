import { Item } from 'ozone-type';
import { OzoneItemAPI } from 'ozone-item-api';
import { OzoneMediaEdit } from 'ozone-media-edit';
import { OzoneCollection } from 'ozone-collection';
export interface DomElements {
    ozoneApi: OzoneItemAPI;
    scrollTheshold: {
        clearTriggers(): void;
    };
    mosaicCollection: OzoneCollection;
    mediaEditor: OzoneMediaEdit;
}
/**
 * `TaktikSearchApiBehavior` defines standard behavior for search modules compatible with *taktik-free-text-search*.
 *
 * @polymerMixin
 */
export interface TaktikSearchApiBehavior {
    /**
     * searchString string for search query.
     */
    searchString: string;
    /**
     * Array of search results
     */
    searchResults: Array<any>;
    /**
     * If true, automatically performs an Ajax request when either *searchString*, *itemType* or *size* changes.
     */
    auto: boolean;
}
/**
 * <ozone-mosaic> is an element that display ozone items in a mosaic view.
 *
 * ```html
 * <ozone-mosaic item-data={{item}}>  </ozone-mosaic>
 * ```
 */
export declare class OzoneMosaic extends Polymer.Element implements TaktikSearchApiBehavior {
    $: DomElements;
    /**
     * id of the source
     */
    searchResults: Array<Item>;
    /**
     * string to search in the collection
     */
    searchString: string;
    /**
     * total number of items found with the search
     */
    total: number;
    /**
     * true indicate that all the data data still available with this search.
     */
    dataRemain: boolean;
    /**
     * Item selected in the collection
     * @notify true
     */
    selectedItem: Item;
    /**
     * unused in this implementation
     */
    auto: boolean;
    static readonly properties: {
        searchResults: {
            type: ArrayConstructor;
            notify: boolean;
            value: () => never[];
        };
        searchString: {
            type: StringConstructor;
        };
        selectedAction: {
            type: NumberConstructor;
            value: number;
        };
        total: {
            type: NumberConstructor;
            notify: boolean;
        };
        dataRemain: {
            type: BooleanConstructor;
            notify: boolean;
            value: boolean;
        };
        selectedItem: {
            notify: boolean;
            type: ObjectConstructor;
        };
    };
    /**
     * trigger quickSearch in the collection
     * @param searchString
     */
    searchInItems(searchString: string): void;
    /**
     *
     */
    toggleThreshold(): void;
    /**
     *
     */
    requestSearch(): void;
    saveSelectedItem(): void;
}
