import { Item } from 'ozone-type';
import { OzoneItemAbstractViewConstructor } from 'ozone-item-abstract-view';
export interface DomElements {
    editableList: Element;
}
export interface EditableFields {
    fieldType: string;
    name: string;
    value: string;
}
declare const OzoneMediaEdit_base: OzoneItemAbstractViewConstructor;
/**
 * <ozone-media-edit> is an element that provide material design to edit an media Item.
 *
 * ```html
 * <ozone-media-edit item-data={{item}}>  </ozone-media-edit>
 * ```
 */
export declare class OzoneMediaEdit extends OzoneMediaEdit_base {
    $: DomElements;
    static editEntryClass: string;
    dataChange(data: Item): Promise<void>;
    private addInputElement(description, data, permission);
    private getEditableItemName(type);
    /**
     * get the item with it's modifies fields.
     * @return {Item}
     */
    getUpdatedData(): Item;
    private getEntryList();
    private removeEntryIfExist();
}
