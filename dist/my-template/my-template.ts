/**
 * Created by hubert on 23/06/17.
 */


/// <amd-module name="my-template"/>

import {customElement} from 'decorators'


/**
 * <my-template> is a template module start an ozone polymer module.
 *
 * ```html
 * <my-template> Document usage with code example </my-template>
 * ```
 */
@customElement('my-template')
export class MyTemplate extends Polymer.Element {

    $: {
        // Declare id: type of you dom elements
    };

    /**
     * Attribute declaration
     * Warning don't assign a value here!
     * Do it in get properties
     * @notify false
     * @value 'hello'
     */
    aAttribute: any;

    static get properties(){
        return {
            aAttribute:{
                type: String,
                notify: false,
                value: 'hello'
            }
        }
    }
}