import { OzoneItemAbstractViewConstructor } from 'ozone-item-abstract-view';
declare const OzoneItemPreview_base: OzoneItemAbstractViewConstructor;
/**
 * `ozone-item-preview` is hight level polymer module to display preview information an ozone item.
 *
 * Example in html:
 * ```html
 * <ozone-item-preview itemData=[[item]]></ozone-item-view>
 * ```
 *
 */
export declare class OzoneItemPreview extends OzoneItemPreview_base {
    /**
     * url of the image preview
     */
    previewImage: string;
    static defaultImagePath: string;
    static readonly properties: {
        previewImage: {
            type: StringConstructor;
        };
    };
    dataChange(data: any): void;
    getMinRatio(): number;
    setDesiredPreviewHeight(desiredPreviewHeight: number): void;
    setMarginTop(margin: number): void;
    setMarginBottom(margin: number): void;
    setMarginLeft(margin: number): void;
    setMarginRight(margin: number): void;
    updateDisplay(): void;
}
