declare const OzoneItemPreview_base: any;
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
    static readonly properties: {
        previewImage: {
            type: StringConstructor;
        };
    };
    dataChange(data: any): void;
}
