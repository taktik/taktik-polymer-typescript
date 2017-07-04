/**
 * <language-selection> is a simple language selection module.
 * demo
 * ```html
 * <language-selection current-language="{{language}}" ></language-selection>
 * ```
 */
export declare class LanguageSelection extends Polymer.Element {
    /**
     * currentLanguage
     * @notify: true
     * @value: 'en'
     */
    currentLanguage: string;
    /**
     * list of availableLanguages
     * @notify: true
     * @value: ['en', 'fr']
     */
    availableLanguages: Array<string>;
    /**
     * defaultLanguage
     * @value: 'en'
     */
    defaultLanguage: string;
    static readonly properties: {
        currentLanguage: {
            type: StringConstructor;
            notify: boolean;
            value: string;
            observer: string;
        };
        defaultLanguage: {
            type: StringConstructor;
            value: string;
        };
        availableLanguages: {
            type: ArrayConstructor;
            notify: boolean;
            value: () => string[];
        };
    };
    /**
     * Fired when language change.
     * This event will be fired if currentLanguage change.
     *
     * @event current-language-change
     */
    /**
     * _currentLanguageChange
     * @param newLanguage
     * @private
     */
    _currentLanguageChange(newLanguage: string): void;
}
