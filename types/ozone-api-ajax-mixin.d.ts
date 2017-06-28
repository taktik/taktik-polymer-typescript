/**
 * Created by hubert on 8/06/17.
 */

declare type uuid = string;
declare function OzoneApiAjaxMixin(element: any):OzoneApiAjaxMixinConstructor

declare interface ConfigType {
    ozoneApi: any,
    type: string,
    host:string,
    view: string,
    permissions: string,
}

declare interface OzoneApiAjaxMixinConstructor {
    new(): OzoneApiAjaxMixinType;
}
declare function getOzoneConfig(): {configPromise: Promise<ConfigType>};
declare class OzoneApiAjaxMixinType extends PolymerElement{

    /**
     * Ozone Config property
     */
    readonly config: ConfigType;

    /**
     * Service URL to be used by each ozone-api instance.
     * Its value is automatically set by computeServiceUrl method.
     */
    readonly serviceUrl: string;

    /**
     * Compute url of each service.
     * This method is foreseen to be called in the observers
     * Example:
     *       `observers: ['computeServiceUrl(config.endPoints.login)'],`
     * @param ozoneEndPoint (String) Api end point as define in the config file.
     */
    computeServiceUrl(ozoneEndPoint: string): void;

    /**
     * Fired when connection to ozone succeeds.
     *
     * @event ozone-request-success
     */

    /**
     * Fired when connection to ozone fails.
     * Event detail contains status and statusText.
     *
     * @event ozone-request-error
     */

}


declare function TaktikSearchApiMixin(element: any):TaktikSearchApiMixinConstructor

declare interface TaktikSearchApiMixinConstructor {
    new(): TaktikSearchApiMixinType;
}
declare interface TaktikSearchApiMixinType extends PolymerElement{
    searchString: string;

    searchResults:string;

    _setSearchResults():void

    auto:string;

    _resultsFound():void


}