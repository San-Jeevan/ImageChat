/*
We have to use an asset manager (located in assetManager.js) to download every large picture before we show anything, 
otherwise the map would be imperfect (some images may not appear or load slowly)
 */

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload('Content/img/map_grey.jpg');
ASSET_MANAGER.queueDownload('Content/img/names.png');
ASSET_MANAGER.queueDownload('Content/img/scroll2_small.png');
ASSET_MANAGER.queueDownload('Content/img/Ship.png');
ASSET_MANAGER.queueDownload('Content/img/pirateship.png');

ASSET_MANAGER.downloadAll(function() {
	Risk.init();
	$("#overlay").fadeOut('slow');
});