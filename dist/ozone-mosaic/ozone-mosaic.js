/**
 * Created by hubert on 8/06/17.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define("ozone-mosaic", ["require", "exports", "decorators"], function (require, exports, decorators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * <ozone-mosaic> is an element that display ozone items in a mosaic view.
     *
     * ```html
     * <ozone-mosaic item-data={{item}}>  </ozone-mosaic>
     * ```
     */
    let OzoneMosaic = class OzoneMosaic extends Polymer.Element {
        /**
         * <ozone-mosaic> is an element that display ozone items in a mosaic view.
         *
         * ```html
         * <ozone-mosaic item-data={{item}}>  </ozone-mosaic>
         * ```
         */
        constructor() {
            super(...arguments);
            this.availableWidth = 300;
            this.itemWidth = 30;
        }
        static get properties() {
            return {
                searchResults: {
                    type: Array,
                    notify: true,
                    value: () => []
                },
                searchString: {
                    type: String
                },
                selectedAction: {
                    type: Number,
                    value: 0,
                },
                total: {
                    type: Number,
                    notify: true
                },
                dataRemain: {
                    type: Boolean,
                    notify: true,
                    value: false
                },
                selectedItem: {
                    notify: true,
                    type: Object
                }
            };
        }
        /**
         * trigger quickSearch in the collection
         * @param searchString
         */
        searchInItems(searchString) {
            this.set('searchResults', []);
            this.$.mosaicCollection.quickSearch(searchString);
        }
        /**
         *
         */
        toggleThreshold() {
            this.$.mosaicCollection.loadNextItems()
                .catch(() => { })
                .then(() => {
                this.$.scrollTheshold.clearTriggers();
            })
                .then(() => {
                setTimeout(() => {
                    //this.recomputeMosaicItemsSizes();
                });
            });
        }
        /**
         *
         */
        requestSearch() {
            this.searchInItems(this.searchString);
        }
        saveSelectedItem() {
            const updatedData = this.$.mediaEditor.getUpdatedData();
            this.$.mosaicCollection.saveOne(updatedData).then((index) => {
                this.set('selectedItem', this.searchResults[index]);
            });
        }
        /**
         * For each mosaic line, we compute a preview height (h)
         * such that the line width is equal to the mosaic total width (w), and
         * the height is as close as possible to the desired preview size (s)
         * <p/>
         * r_i = aspectRatio of image i = height_i / width_i
         * w = mosaic total width
         * b = mosaic items border width
         * m = mosaic items margin
         * s = desired preview height
         * h = computed(actual) preview height
         * <p/>
         * For a line with n images we have :
         * <p/>
         * line width = 2.n.b + n.m + sum(1..n, h/r_i) , must be equal to w
         * <p/>
         * Isolating h:
         * <p/>
         * h = (w - n.(2.b - m)) / sum(1..n, 1 / r_i), must be as close to s as possible
         * <p/>
         * we pose sr_i = sum(1..n, 1 / r_i)
         * <p/>
         * We start with one image :
         * <p/>
         * h_1 = (w - 2.b - m) / sr_1  (normally h_1 > s)
         * <p/>
         * And add image by image until h_i < s :
         * <p/>
         * sr_n = sr_n-1 + 1/r_n
         * h_n = (w - n.(2.b - m)) / sr_n
         */
        recomputeMosaicItemsSizes() {
            const medias = this.$.ironList.getElementsByTagName('ozone-item-preview');
            let currentLine = [];
            let currentAspectRatiosSum = 0;
            let newAspectRatioSum;
            let newComputedHeight;
            let currentComputedHeight = Number.MAX_VALUE;
            let twicePreviewSize = 2 * this.previewSize;
            for (let i = 0; i < medias.length; i++) {
                const item = medias[i];
                let itemMinRatio = item.getMinRatio();
                newAspectRatioSum = currentAspectRatiosSum + itemMinRatio;
                newComputedHeight = (this.getAvailableWidth(currentLine.length + 1)) / newAspectRatioSum;
                if (newComputedHeight < (this.previewSize)) {
                    if ((currentComputedHeight + newComputedHeight) < twicePreviewSize) {
                        this.processLine(currentLine, currentComputedHeight);
                        currentLine = [];
                        currentLine.push(item);
                        currentAspectRatiosSum = itemMinRatio;
                        currentComputedHeight = (this.getAvailableWidth(1)) / currentAspectRatiosSum;
                    }
                    else {
                        currentLine.push(item);
                        this.processLine(currentLine, newComputedHeight);
                        currentLine = [];
                        currentAspectRatiosSum = 0;
                        currentComputedHeight = Number.MAX_VALUE;
                    }
                }
                else {
                    currentLine.push(item);
                    currentAspectRatiosSum = newAspectRatioSum;
                    currentComputedHeight = newComputedHeight;
                }
            }
            // Process last line items
            let i = 0;
            for (let lineItem of currentLine) {
                // Calculate margins
                let marginTop = 0;
                let marginBottom = 0;
                let marginLeft = 0;
                let marginRight = 0; //(i < currentLine.size() - 1) ? CommonViewResources.INSTANCE.style().mediaPreviewDisplayMargin() : 0;
                this.processItem(lineItem, this.previewSize, marginTop, marginBottom, marginLeft, marginRight);
                i++;
            }
        }
        get previewSize() { return 30; }
        processItem(item, desiredPreviewHeight, marginTop, marginBottom, marginLeft, marginRight) {
            item.setDesiredPreviewHeight(desiredPreviewHeight);
            item.setMarginTop(marginTop);
            item.setMarginBottom(marginBottom);
            item.setMarginLeft(marginLeft);
            item.setMarginRight(marginRight);
            item.updateDisplay();
        }
        getAvailableWidth(numberOfItems) {
            /*if (availableWidthCache != null && numberOfItems <= AVAILABLE_WIDTH_CACHE_SIZE) {
                let w:number = availableWidthCache[numberOfItems];
                if (w == 0) {
                    w = this.calculateAvailableWidth(numberOfItems);
                    availableWidthCache[numberOfItems] = w;
                }
                return w;
            } else {
            */
            return this.calculateAvailableWidth(numberOfItems);
            //}
        }
        calculateAvailableWidth(numberOfItems) {
            this.availableWidth = this.$.resultList.offsetWidth;
            /*return availableWidth -
                ((numberOfItems - 1) * CommonViewResources.INSTANCE.style().mediaPreviewDisplayMargin()) -
                (numberOfItems * (2 * CommonViewResources.INSTANCE.style().mediaPreviewDisplaySelectionBorderWidth()));
                */
            return this.availableWidth - numberOfItems * this.itemWidth;
        }
        invalidateAvailableWidthCache() {
            // invalidate available width cache
            //availableWidthCache =  new Array(AVAILABLE_WIDTH_CACHE_SIZE)//new int[AVAILABLE_WIDTH_CACHE_SIZE];
        }
        recalculateAvailableWidth() {
            this.calculateAvailableWidth(0);
            this.invalidateAvailableWidthCache();
        }
        processLine(currentLine, preciseDesiredPreviewHeight) {
            console.log('processLine', currentLine.length);
            let availableWidth = this.getAvailableWidth(currentLine.length);
            let desiredPreviewHeight = Math.round(preciseDesiredPreviewHeight);
            let preciseTotalWidth = 0;
            let actualTotalWidth = 0;
            for (let i = 0; i < currentLine.length; i++) {
                const lineItem = currentLine[i];
                let lastItem = (i == currentLine.length - 1);
                let itemMinRatio = lineItem.getMinRatio();
                preciseTotalWidth += itemMinRatio * preciseDesiredPreviewHeight;
                actualTotalWidth += Math.round(lineItem.getMinRatio() * desiredPreviewHeight);
                // Compensate precision loss (skip first item)
                let precisionLoss = (i > 0) ? (preciseTotalWidth - actualTotalWidth) : 0;
                precisionLoss += lastItem ? availableWidth - actualTotalWidth - precisionLoss : 0;
                actualTotalWidth += precisionLoss;
                // Calculate margins
                let marginTop = 0;
                let marginBottom = 0; //CommonViewResources.INSTANCE.style().mediaPreviewDisplayMargin();
                let marginLeft = precisionLoss;
                let marginRight = 0; //!lastItem ? CommonViewResources.INSTANCE.style().mediaPreviewDisplayMargin() : 0;
                this.processItem(lineItem, desiredPreviewHeight, marginTop, marginBottom, marginLeft, marginRight);
                i++;
            }
        }
    };
    __decorate([
        decorators_1.domElement(),
        __metadata("design:type", Object)
    ], OzoneMosaic.prototype, "$", void 0);
    OzoneMosaic = __decorate([
        decorators_1.customElement('ozone-mosaic')
    ], OzoneMosaic);
    exports.OzoneMosaic = OzoneMosaic;
});
