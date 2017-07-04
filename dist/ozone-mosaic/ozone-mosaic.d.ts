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
    ironList: PolymerElement;
    resultList: HTMLElement;
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
    availableWidth: number;
    itemWidth: number;
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
    /**
     * For each mosaic line, we compute a preview height (h)
     * such that the line width is equal to the mosaic total width (w), and
     * the height is as close as possible to the desired preview size (s)
     * <p/>
     * r_i = aspectRatio of image i = height_i / width_i
     * w = mosaic total width
     * b = mosaic items border width
     * m = mosaic items margin
     * s = desired preview height
     * h = computed(actual) preview height
     * <p/>
     * For a line with n images we have :
     * <p/>
     * line width = 2.n.b + n.m + sum(1..n, h/r_i) , must be equal to w
     * <p/>
     * Isolating h:
     * <p/>
     * h = (w - n.(2.b - m)) / sum(1..n, 1 / r_i), must be as close to s as possible
     * <p/>
     * we pose sr_i = sum(1..n, 1 / r_i)
     * <p/>
     * We start with one image :
     * <p/>
     * h_1 = (w - 2.b - m) / sr_1  (normally h_1 > s)
     * <p/>
     * And add image by image until h_i < s :
     * <p/>
     * sr_n = sr_n-1 + 1/r_n
     * h_n = (w - n.(2.b - m)) / sr_n
     */
    protected recomputeMosaicItemsSizes(): void;
    protected readonly previewSize: number;
    private processItem(item, desiredPreviewHeight, marginTop, marginBottom, marginLeft, marginRight);
    private getAvailableWidth(numberOfItems);
    private calculateAvailableWidth(numberOfItems);
    private invalidateAvailableWidthCache();
    protected recalculateAvailableWidth(): void;
    private processLine(currentLine, preciseDesiredPreviewHeight);
}
