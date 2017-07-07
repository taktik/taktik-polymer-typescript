export interface DomElements {
    input: PolymerElement;
}
declare const OzoneEditSetEntry_base: any;
/**
 * <ozone-edit-number-entry> is an element to edit ozone items fields as set<string>.
 *
 */
export declare class OzoneEditSetEntry extends OzoneEditSetEntry_base {
    textValue: string;
    static readonly properties: {
        textValue: {
            type: StringConstructor;
        };
    };
    static readonly observers: string[];
    registerChangeListener(): void;
    textToSet(textValue: string): Array<string>;
    setTotext(arrayValue: Array<string>): string;
    isValueAndTextEqual(): boolean;
    valueChange(): void;
    textChange(): void;
}
