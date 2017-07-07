/**
 * Created by hubert on 23/06/17.
 */


/// <amd-module name="ozone-media-edit"/>

import {customElement} from 'decorators'
import {Item, FieldDescriptor} from 'ozone-type'
import {OzonePreviewSize} from 'mediaUrl'
import{OzoneItemAbstractView, OzoneItemAbstractViewConstructor} from 'ozone-item-abstract-view'
import {OzoneEditEntryBehavior} from 'ozone-edit-entry'
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
 * <ozone-media-edit> is an element that provide material design to edit an media Item.
 *
 * ```html
 * <ozone-media-edit item-data={{item}}>  </ozone-media-edit>
 * ```
 */
@customElement('ozone-media-edit')
export class OzoneMediaEdit  extends OzoneItemAbstractView(Polymer.Element)  {

    $: DomElements;

    static editEntryClass = 'editEntry';


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

        await(super.loadImage(data, OzonePreviewSize.Small));
    }

    private async addInputElement(description:FieldDescriptor, data: Item, permission: FieldsPermission) {
        const fieldType = description.fieldType || "unknown";

        const identifier = description.identifier;

        const fieldName = description.name || {strings: {en: identifier + '*'}};


        const listEntry = document.createElement('li');
        listEntry.className = 'ozoneEditItemContent';


        const editableItemName = this.getEditableItemName(fieldType);

        if(typeof(editableItemName) == 'string') {
            const editableItem = document.createElement(editableItemName) as (OzoneEditEntryBehavior);
            editableItem.className = OzoneMediaEdit.editEntryClass;
            editableItem.id = identifier;
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
    getUpdatedData(){
        const entryList = this.getEntryList();
        const updatedItem: Item = {
            type: this.itemData.type,
            id: this.itemData.id,
        };
        for (let index = 0; index < entryList.length; index ++){
            let entry = entryList.item(index) as OzoneEditEntryBehavior;
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