import { Item } from 'ozone-type';
import { OzoneApiItem } from 'ozone-api-item';
import { OzoneCollection } from 'ozone-collection';
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
 *
 *  ### Events
 *
 * * *results-found* Fired when results are found by the API.
 *
 * ### Implements
 *
 *  *TaktikSearchApiBehavior*
 */
export declare class OzoneMosaic extends Polymer.Element implements TaktikSearchApiBehavior {
    $: {
        ozoneApi: OzoneApiItem;
        scrollTheshold: {
            clearTriggers(): void;
        };
        mosaicCollection: OzoneCollection;
        ironList: PolymerElement;
    };
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
     * start a new search base on -searchString-.
     */
    requestSearch(): void;
    /**
     * Save given item.
     * @param {Item} updatedData
     * @return {Promise<Item>}
     */
    saveSelectedItem(updatedData?: Item): Promise<Item>;
}
