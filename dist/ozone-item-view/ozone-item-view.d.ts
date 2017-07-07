import { Item } from 'ozone-type';
import { OzoneItemAbstractViewConstructor } from 'ozone-item-abstract-view';
export interface rawField {
    name: string;
    type: string;
    value: any;
}
declare const OzoneItemView_base: OzoneItemAbstractViewConstructor;
/**
 * `ozone-item-view` is hight level polymer module to display raw information an ozone item.
 *
 * Example in html:
 * ```html
 * <ozone-item-view itemData=[[item]] ozoneTypeApiId="DifferentOzoneTypeApi"></ozone-item-view>
 * ```
 *
 * Example in javaScript:
 * ```javaScript
 *         var toLocal = document.createElement('ozone-item-view') as OzoneItemView;
 *         toLocal.id = 'ozoneViewContent'
 *         toLocal.className = type;
 *         toLocal.itemData = data;
 *         // if you don't want to use the default API
 *         toLocal.ozoneTypeApi = this.parentNode.querySelector('#ozoneApiType') as OzoneTypeAPI;
 *         this.root.appendChild(toLocal);
 * ```
 */
export declare class OzoneItemView extends OzoneItemView_base {
    /**
     * raw fields information to display
     */
    rawFields: Array<rawField>;
    /**
     * url of the image preview
     */
    previewImage: string;
    static readonly properties: {
        rawFields: {
            type: ArrayConstructor;
            notify: boolean;
            value: () => never[];
        };
        previewImage: {
            type: StringConstructor;
        };
    };
    dataChange(data: Item): Promise<void>;
    private computeFieldName(entry, description);
    private orderEntries(data);
}
