import { Item } from 'ozone-type';
import { OzoneItemAbstractViewConstructor } from 'ozone-item-abstract-view/ozone-item-abstract-view';
import { ClapprPlayer } from 'taktik-clappr-wrapper';
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
 *  <link rel="import" href="../ozone-media-edit/ozone-media-edit.html">
 *      ...
 *  <ozone-media-edit item-data={{item}}>  </ozone-media-edit>
 * ```
 */
export declare class OzoneMediaEdit extends OzoneMediaEdit_base {
    $: {
        editableList: Element;
        player: Element;
    };
    static editEntryClass: string;
    /**
     * Clappr player element
     */
    player: ClapprPlayer | undefined;
    /**
     * hide element and pose the player.
     */
    hidden: boolean;
    ready(): void;
    static readonly properties: {
        hidden: {
            type: BooleanConstructor;
            value: boolean;
            observer: string;
        };
        isVideo: {
            type: BooleanConstructor;
            value: boolean;
        };
        player: {
            type: ObjectConstructor;
            value: boolean;
        };
    };
    visibilityChange(): void;
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
    loadVideo(data?: Item): Promise<void>;
}
