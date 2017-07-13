import { Item } from 'ozone-type';
import { OzoneItemAbstractViewConstructor } from 'ozone-item-abstract-view';
declare const OzoneItemPreview_base: OzoneItemAbstractViewConstructor;
/**
 * `ozone-item-preview` is hight level polymer module to display preview information an ozone item.
 *
 * Example in html:
 * ```html
 * <ozone-item-preview itemData=[[item]]></ozone-item-preview>
 * ```
 *
 * ### Events
 *
 * * *edit-item* fire on click on close button.
 *
 */
export declare class OzoneItemPreview extends OzoneItemPreview_base {
    /**
     * url of the image preview
     */
    previewImage: string;
    /**
     * the element appear select when set at true
     */
    selected: boolean;
    static defaultImagePath: string;
    static readonly properties: {
        previewImage: {
            type: StringConstructor;
        };
        selected: {
            type: BooleanConstructor;
        };
    };
    static readonly observers: string[];
    placeholder(itemData: Item): string;
    private _editItem(e);
    dataChange(data: Item): void;
    private _setFocus();
    private _removeFocus();
    private _selectionChange(selected);
}
