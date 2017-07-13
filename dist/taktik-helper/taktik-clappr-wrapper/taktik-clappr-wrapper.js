/// <amd-module name="taktik-clappr-wrapper"/>
define("taktik-clappr-wrapper", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * return Clapper player
     * @return {ClapprType|any}
     */
    function getPlayer() {
        let clapperCopy;
        try {
            clapperCopy = Clappr;
            console.log('clappr OK');
        }
        catch (err) {
            clapperCopy = undefined;
            console.log('clappr not found');
        }
        return clapperCopy;
    }
    exports.getPlayer = getPlayer;
    ;
});
