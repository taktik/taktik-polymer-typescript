/**
 * Created by hubert on 23/06/17.
 */


/// <amd-module name="ozone-media-edit"/>

import {customElement} from 'decorators'
import {Item, FieldDescriptor} from 'ozone-type'
import {MediaUrl, OzonePreviewSize} from 'ozone-media-url'
import{OzoneItemAbstractView, OzoneItemAbstractViewConstructor} from 'ozone-item-abstract-view/ozone-item-abstract-view'
import {OzoneEditEntryBehavior} from 'ozone-edit-entry/ozone-edit-entry'
import {FieldsPermission} from 'ozone-api-type'

import {ClapprWrapper, ClapprType, ClapprPlayer} from 'taktik-clappr-wrapper'

export interface EditableFields{
    fieldType: string,
    name: string,
    value:string,
}
/**
 * <ozone-media-edit> is an element that provide material design to edit an media Item.
 *
 * ```html
 *  <link rel="import" href="../ozone-media-edit/ozone-media-edit.html">
 *      ...
 *  <ozone-media-edit item-data={{item}}>  </ozone-media-edit>
 * ```
 */
@customElement('ozone-media-edit')
export class OzoneMediaEdit  extends OzoneItemAbstractView(Polymer.Element)  {

    $: {
        editableList: Element,
        player: Element,
    };

    static editEntryClass = 'editEntry';

    /**
     * Clappr player element
     */
    player: ClapprPlayer | undefined;

    /**
     * hide element and pose the player.
     */
    hidden: boolean;

    ready(){
        super.ready();
    }
    static get properties(){
        return {
            hidden: {
                type: Boolean,
                value: false,
                observer: 'visibilityChange'
            },
            isVideo: {
                type: Boolean,
                value: false,
            },
            player: {
                type: Object,
                value: false,
            },
        }
    }

    visibilityChange(){
        if(this.hidden && this.player){
            this.player.pause();
        }
    }

    async dataChange(data:Item){
        if(!data){
            return ;
        }
        if(!data.hasOwnProperty('type')){
            return ;
        }
        this.removeEntryIfExist();
        const fields:Array<FieldDescriptor> = await(this.ozoneTypeApi.getAllFields(data.type));

        const permission  = await(this.ozoneTypeApi.getPermissions(fields, data.id||''));

        fields.sort((a, b)=>{return a.fieldType.localeCompare(b.fieldType)});

        for(let description of fields){
            if(description){
                await (this.addInputElement(description, data, permission));
            }
        }

        await(super.loadImage(data, OzonePreviewSize.Medium));
        await(this.loadVideo(data));
    }

    private async addInputElement(description:FieldDescriptor, data: Item, permission: FieldsPermission) {
        const fieldType = description.fieldType || "unknown";

        const identifier = description.identifier;

        const fieldName = description.name || {strings: {en: identifier + '*'}};


        const listEntry = document.createElement('div');
        listEntry.className = 'ozoneEditItemContent';


        const editableItemName = this.getEditableItemName(fieldType);

        if(typeof(editableItemName) == 'string') {
            const editableItem = document.createElement(editableItemName) as (OzoneEditEntryBehavior);
            editableItem.className = OzoneMediaEdit.editEntryClass;
            editableItem.id = identifier;
            editableItem.type = fieldType;
            editableItem.value = data[identifier];
            editableItem.language = 'en';
            editableItem.name = fieldName;

            const isEditAllow: boolean = permission.isFieldEditable(identifier);

            editableItem.disabled = !isEditAllow;


            listEntry.appendChild(editableItem);
            this.$.editableList.appendChild(listEntry);

            editableItem.inputElement.addEventListener('value-changed', (d:Event) => {
                this.dispatchEvent(new CustomEvent('value-changed',
                    {bubbles: true, composed: true}));
            })
        }
    }

    private getEditableItemName(type:string):string | undefined{
        let editableItemName;
        switch(type){
            case 'string':
            case 'date':
                editableItemName = 'ozone-edit-entry';
                break;
            case 'set<string>':
                editableItemName = 'ozone-edit-set-entry';
                break;

            case 'analyzed_string':
            case 'blob':
                editableItemName = 'ozone-edit-text-entry';
                break;
            case 'integer':
            case 'float':
            case 'double':
                editableItemName = 'ozone-edit-number-entry';
                break;
        }
        return editableItemName
    }

    /**
     * get the item with it's modifies fields.
     * @return {Item}
     */
    getUpdatedData():Item{
        const entryList = this.getEntryList();
        const updatedItem: Item = {
            type: this.itemData.type,
            id: this.itemData.id,
        };
        for (let index = 0; index < entryList.length; index ++){
            let entry = entryList.item(index) as OzoneEditEntryBehavior;
            if(entry.isModify) {
                updatedItem[entry.id] = entry.value;
            }
        }
        return updatedItem
    }

    private getEntryList() {
        return this.$.editableList.getElementsByClassName(OzoneMediaEdit.editEntryClass);
    }
    private removeEntryIfExist(){
        const entryList = this.$.editableList.getElementsByClassName('ozoneEditItemContent');
        while (entryList.length > 0){
            entryList[0].remove();
        }
        if(this.player){
            this.player.destroy();
        }
        this.set('isVideo', false);
    }

    async loadVideo(data?: Item){
        if(this.ozoneTypeApi && data && ClapprWrapper) {
            if (await ( this.ozoneTypeApi.ifIsTypeInstanceOf(data.type, 'video'))) {
                const mediaUrl = new MediaUrl(data.id as string, this.ozoneTypeApi.config);
                const url = mediaUrl.getVideoUrl();

                this.player = new (ClapprWrapper as ClapprType).Player({
                    source: url,
                    poster: this.previewImage,});

                var playerElement = document.createElement('div');
                this.$.player.appendChild(playerElement);
                this.player.attachTo(playerElement);

                this.set('isVideo', true);
            }
        }
    }


}