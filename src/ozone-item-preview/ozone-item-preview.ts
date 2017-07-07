/**
 * Created by hubert on 8/06/17.
 */

/// <amd-module name="ozone-item-preview"/>
import {customElement} from 'decorators'
import {Item, Media} from 'ozone-type';
import {MediaUrl, OzonePreviewSize} from 'mediaUrl'
import{OzoneItemAbstractView, OzoneItemAbstractViewConstructor} from 'ozone-item-abstract-view'


/**
 * `ozone-item-preview` is hight level polymer module to display preview information an ozone item.
 *
 * Example in html:
 * ```html
 * <ozone-item-preview itemData=[[item]]></ozone-item-preview>
 * ```
 *
 */
@customElement('ozone-item-preview')
export class OzoneItemPreview  extends OzoneItemAbstractView(Polymer.Element){

    /**
     * url of the image preview
     */
    previewImage: string;

    static defaultImagePath = ""
    static get properties() {
        return {
            previewImage: {
                type: String
            }
        }
    }
    placeholder(itemData:Item):string {
        let placeholder: string = "";
        switch(itemData.type) {
            case 'organization.info':
                placeholder = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0NC4xICg0MTQ1NSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+QXJ0Ym9hcmQ8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iLSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IkFydGJvYXJkIj4KICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS02IiB4PSIwIiB5PSIwIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiI+PC9yZWN0PgogICAgICAgICAgICA8dGV4dCBpZD0iZmFjdG9yeS0tLVZhYWRpbi1JY29ucyIgZm9udC1mYW1pbHk9IlZhYWRpbi1JY29ucyIgZm9udC1zaXplPSIyNTAiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIGZpbGwtb3BhY2l0eT0iMC40MiIgZmlsbD0iIzAwMDAwMCI+CiAgICAgICAgICAgICAgICA8dHNwYW4geD0iMTMxIiB5PSIzNjUiPu6ZgTwvdHNwYW4+CiAgICAgICAgICAgIDwvdGV4dD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==";
                break;
            case 'message':
                placeholder = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0NS4xICg0MzUwNCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+QXJ0Ym9hcmQ8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iLSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IkFydGJvYXJkIj4KICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS02IiB4PSIwIiB5PSIwIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiI+PC9yZWN0PgogICAgICAgICAgICA8dGV4dCBpZD0iY29tbWVudC0tLW1hdGVyaWFsIiBmb250LWZhbWlseT0ibWF0ZXJpYWwiIGZvbnQtc2l6ZT0iMjUwIiBmb250LXdlaWdodD0ibm9ybWFsIiBmaWxsLW9wYWNpdHk9IjAuNDIiIGZpbGw9IiMwMDAwMDAiPgogICAgICAgICAgICAgICAgPHRzcGFuIHg9IjEzMSIgeT0iMzQ0Ij7uorU8L3RzcGFuPgogICAgICAgICAgICA8L3RleHQ+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=";
                break;

            case 'image':
                placeholder = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0NS4xICg0MzUwNCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+QXJ0Ym9hcmQ8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iLSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IkFydGJvYXJkIj4KICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS02IiB4PSIwIiB5PSIwIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiI+PC9yZWN0PgogICAgICAgICAgICA8dGV4dCBpZD0iaW1hZ2UtLS1tYXRlcmlhbCIgZm9udC1mYW1pbHk9Im1hdGVyaWFsIiBmb250LXNpemU9IjI1MCIgZm9udC13ZWlnaHQ9Im5vcm1hbCIgZmlsbC1vcGFjaXR5PSIwLjQyIiBmaWxsPSIjMDAwMDAwIj4KICAgICAgICAgICAgICAgIDx0c3BhbiB4PSIxMzEiIHk9IjM0NCI+7qacPC90c3Bhbj4KICAgICAgICAgICAgPC90ZXh0PgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+";
                break;

            case 'video':
                placeholder = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0NS4xICg0MzUwNCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+QXJ0Ym9hcmQ8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iLSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IkFydGJvYXJkIj4KICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS02IiB4PSIwIiB5PSIwIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiI+PC9yZWN0PgogICAgICAgICAgICA8dGV4dCBpZD0ib25kZW1hbmRfdmlkZW8tLS1tYXRlcmlhbCIgZm9udC1mYW1pbHk9Im1hdGVyaWFsIiBmb250LXNpemU9IjI1MCIgZm9udC13ZWlnaHQ9Im5vcm1hbCIgZmlsbC1vcGFjaXR5PSIwLjQyIiBmaWxsPSIjMDAwMDAwIj4KICAgICAgICAgICAgICAgIDx0c3BhbiB4PSIxMzEiIHk9IjM0NCI+7qmAPC90c3Bhbj4KICAgICAgICAgICAgPC90ZXh0PgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+";
                break;

            case 'channel':
                placeholder = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0NS4xICg0MzUwNCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+QXJ0Ym9hcmQ8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iLSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IkFydGJvYXJkIj4KICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS02IiB4PSIwIiB5PSIwIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiI+PC9yZWN0PgogICAgICAgICAgICA8dGV4dCBpZD0ibGl2ZV90di0tLW1hdGVyaWFsIiBmb250LWZhbWlseT0ibWF0ZXJpYWwiIGZvbnQtc2l6ZT0iMjUwIiBmb250LXdlaWdodD0ibm9ybWFsIiBmaWxsLW9wYWNpdHk9IjAuNDIiIGZpbGw9IiMwMDAwMDAiPgogICAgICAgICAgICAgICAgPHRzcGFuIHg9IjEzMSIgeT0iMzQ0Ij7up5Y8L3RzcGFuPgogICAgICAgICAgICA8L3RleHQ+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=";
                break;

            default:
                return "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0NC4xICg0MTQ1NSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+QXJ0Ym9hcmQ8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iLSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IkFydGJvYXJkIj4KICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS02IiB4PSIwIiB5PSIwIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiI+PC9yZWN0PgogICAgICAgICAgICA8dGV4dCBpZD0i7qaoIiBmb250LWZhbWlseT0ibWF0ZXJpYWwiIGZvbnQtc2l6ZT0iMjUwIiBmb250LXdlaWdodD0ibm9ybWFsIiBmaWxsLW9wYWNpdHk9IjAuNDIiIGZpbGw9IiMwMDAwMDAiPgogICAgICAgICAgICAgICAgPHRzcGFuIHg9IjEzMSIgeT0iMzQ0Ij7upqg8L3RzcGFuPgogICAgICAgICAgICA8L3RleHQ+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=";

        }
        return placeholder;
    }
    _editItem(e: Event){
        this.dispatchEvent(new CustomEvent('edit-item',
            {bubbles: true, composed: true, detail:{selectedItem: this}}));
    }

    dataChange(data:any){
        if(this.ozoneTypeApi) {
            this.ozoneTypeApi.ifIsTypeInstanceOf(data.type, 'media').then((isTypeInstanceOf) => {
                if(isTypeInstanceOf) {
                    const mediaUrl = new MediaUrl(data.id as string, this.ozoneTypeApi.config);
                    this.set('previewImage', mediaUrl.getPreviewUrlPng(OzonePreviewSize.Small));
                } else {
                    this.set('previewImage', null);
                }
            }).catch(() => {
            });
        } else {
            throw new Error('ozoneTypeApi is not define')
        }
    }
    getMinRatio():number{
        const item: Media = this.itemData as Media ;
        return item.previewRatio || 1;
    }

    setDesiredPreviewHeight(desiredPreviewHeight:number){
        this.style.height = String(desiredPreviewHeight);
    }
    setMarginTop(margin:number){
        this.style.marginTop = String(margin);
    }
    setMarginBottom(margin:number){
        this.style.marginBottom = String(margin);
    }
    setMarginLeft(margin:number){
        this.style.marginLeft = String(margin);
    }
    setMarginRight(margin:number){
        this.style.marginRight = String(margin);
    }
    updateDisplay(){}

    _togglePanel(){
        this.$.actionsPanel.classList.toggle("open");
    }

}