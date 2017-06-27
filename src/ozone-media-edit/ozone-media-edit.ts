/**
 * Created by hubert on 23/06/17.
 */


/// <amd-module name="ozone-media-edit"/>

import {customElement} from 'decorators'
import {Item, FieldDescriptor} from 'ozone-type'
import {MediaUrl, OzoneImageSize} from 'mediaUrl'
import{OzoneItemAbstractView, OzoneItemAbstractViewConstructor} from 'ozone-item-abstract-view'
import {OzoneEditEntryInterface} from 'ozone-edit-entry'
import {FieldsPermission} from 'ozone-type-api'

export interface DomElements {
    editableList: Element,
}

export interface EditableFields{
    fieldType: string,
    name: string,
    value:string,
}

/**
 * <ozone-media-edit> is a template module start an ozone polymer module.
 *
 * ```html
 * <ozone-madia-edit item-data={{item}}>  </my-template>
 * ```
 */
@customElement('ozone-media-edit')
export class OzoneMediaEdit  extends OzoneItemAbstractView(Polymer.Element)  {

    $: DomElements;
    static editEntryClass = 'editEntry'
    selectedTab: number;

    static properties(){
        return {
            selectedTab: {
                type: Number,
            }
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

        fields.sort((a, b)=>{return a.identifier.localeCompare(b.identifier)});

        for(let description of fields){
            if(description){
                await (this.addInputElement(description, data, permission));
            }
        }

        await(super.loadImage(data, OzoneImageSize.Small));
    }

    private async addInputElement(description:FieldDescriptor, data: Item, permission: FieldsPermission) {
        const fieldType = description.fieldType || "unknown";

        const identifier = description.identifier;

        const fieldName = description.name || {strings: {en: identifier + '*'}};


        const listEntry = document.createElement('li');
        listEntry.className = 'ozoneEditItemContent';


        const editableItemName = this.getEditableItemName(fieldType);

        if(typeof(editableItemName) == 'string') {
            const editableItem = document.createElement(editableItemName) as (OzoneEditEntryInterface);
            editableItem.className = OzoneMediaEdit.editEntryClass;
            editableItem.identifier = identifier;
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

    getEditableItemName(type:string):string | undefined{
        let editableItemName;
        switch(type){
            case 'string':
            case 'date':
            case 'set<string>':
                editableItemName = 'ozone-edit-entry';
                break;

            case 'analyzed_string':
            case 'blob':
                editableItemName = 'ozone-edit-text-entry';
                break;

        }
        return editableItemName
    }

    getUpdatedData(){
        const entryList = this.getEntryList();
        const updatedItem: Item = {
            type: this.itemData.type,
            id: this.itemData.id,
        };
        for (let index = 0; index < entryList.length; index ++){
            let entry = entryList.item(index) as OzoneEditEntryInterface;
            if(entry.isModify) {
                updatedItem[entry.identifier] = entry.value;
            }
        }
        return updatedItem
    }

    private getEntryList() {
        return this.$.editableList.getElementsByClassName(OzoneMediaEdit.editEntryClass);
    }
    private removeEntryIfExist(){
        const entryList = this.$.editableList.getElementsByTagName('li');
        while (entryList.length > 0){
            entryList[0].remove();
        }
    }
}