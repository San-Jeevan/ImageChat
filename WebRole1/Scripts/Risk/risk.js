var CountryGroupObjects = [];
var Risk = {

	/**
	 * Settings Object, holding application wide settings
	 */
	Settings :{
		globalScale: 1,
		colors: { yellow: '#ff0', green: '#0f0', blue: '#00f', red: '#f00', purple: '#f0f', cyan: '#00ffe4' },
		
	},

	


	/**
	 * Our main Territories object
	 * It looks like:
	 * Territories: {
	 *     Alaska: {path: Object, color: String, name: 'Alaska', ...},
	 *	   ... 
	 *	}
	 */
	Territories: {},

	stage: null,
	mapLayer: null,
	topLayer:  null,
	backgroundLayer: null,

	init: function() {
		//Initiate our main Territories Object, it contains essential data about the territories current state
		Risk.setUpTerritoriesObj();

		//Initiate a Kinetic stage
		Risk.stage = new Kinetic.Stage({
			container: 'map',
			width: 1920,
			height: 1080
		});

		//Risk.stage.on("mousemove", function (e) {
		//    console.log(e.x + "|" + e.y);
	    //});
		var points_asia = new Kinetic.Text({
		    x: 50,
		    y: 825,
		    text: 'Asia: 7 points',
		    fontSize: 18,	
		    fontFamily: 'newRoman',
		    fill: 'black'
		});

		var points_europe = new Kinetic.Text({
		    x: 50,
		    y: 850,
		    text: 'Europe: 5 points',
		    fontSize: 18,
		    fontFamily: 'newRoman',
		    fill: 'black'
		});

		var points_NA = new Kinetic.Text({
		    x: 50,
		    y: 875,
		    text: 'North America: 5 points',
		    fontSize: 18,
		    fontFamily: 'newRoman',
		    fill: 'black'
		});
	    

		var points_Africa = new Kinetic.Text({
		    x: 50,
		    y: 900,
		    text: 'Africa: 3 points',
		    fontSize: 18,
		    fontFamily: 'newRoman',
		    fill: 'black'
		});
	    

		var points_SA = new Kinetic.Text({
		    x: 50,
		    y: 925,
		    text: 'South America: 2 points',
		    fontSize: 18,
		    fontFamily: 'newRoman',
		    fill: 'black'
		});
	    
		var points_oceania = new Kinetic.Text({
		    x: 50,
		    y: 950,
		    text: 'Oceania: 2 points',
		    fontSize: 18,
		    fontFamily: 'newRoman',
		    fill: 'black'
		});
		
	    
		var imgObj = new Image();
		imgObj.src = 'Content/img/scroll2_small.png';

		var img = new Kinetic.Image({
		    image: imgObj,
	
		    x: 0,
		    y: 775,
		    opacity: 0.6
		    //alpha: 0.8
		});
		    

		var imgObj2 = new Image();
		imgObj2.src = 'Content/img/pirateship.png';

	    var img2 = new Kinetic.Image({
	        image: imgObj2,
	        x: 1050,
	        y: 700,
	        width: 200,
	        height: 200,
	        opacity:0.4
	    //alpha: 0.8
	    });
	    

	    var imgObj3 = new Image();
	    imgObj3.src = 'Content/img/Ship.png';

	    var img3 = new Kinetic.Image({
	        image: imgObj3,
	        x: 1550,
	        y: 400,
	  
	        opacity: 0.3
	        //alpha: 0.8
	    });

		Risk.pointsLayer = new Kinetic.Layer({
		    scale: Risk.Settings.globalScale
		});
		Risk.pointsLayer.add(img);
		Risk.pointsLayer.add(img2);
		Risk.pointsLayer.add(img3);
		Risk.pointsLayer.add(points_asia);
		Risk.pointsLayer.add(points_europe);
		Risk.pointsLayer.add(points_NA);
		Risk.pointsLayer.add(points_Africa);
		Risk.pointsLayer.add(points_SA);
		Risk.pointsLayer.add(points_oceania);
	   

		Risk.mapLayer = new Kinetic.Layer({
			scale: Risk.Settings.globalScale
		});

		Risk.topLayer = new Kinetic.Layer({
			scale: Risk.Settings.globalScale
		});

		Risk.drawBackgroundImg();
		Risk.drawTerritories();

		Risk.stage.add(Risk.backgroundLayer);
		Risk.stage.add(Risk.mapLayer);
		Risk.stage.add(Risk.topLayer);
		Risk.stage.add(Risk.pointsLayer);

		Risk.mapLayer.draw();

		Risk.divideTerritories();
	},

	/**
	 * Initiate the  Risk.Territories Object, this will contain essential informations about the territories 
	 */
	setUpTerritoriesObj: function() {
		for(id in TerritoryNames) {

			var pathObject = new Kinetic.Path({
				data: TerritoryPathData[id].path,
				id: id //set a unique id --> path.attrs.id
			});

			//Using a sprite image for territory names
			//see: drawImage() -- https://developer.mozilla.org/en-US/docs/Canvas_tutorial/Using_images , and see Kinetic.Image() docs for more
			var sprite = new Image();
			sprite.src = 'Content/img/names.png';
			var territoryNameImg = new Kinetic.Image({
				image: sprite,
				x: FontDestinationCoords[id].x,
				y: FontDestinationCoords[id].y,
				width: FontSpriteCoords[id].sWidth, //'destiantion Width' 
				height: FontSpriteCoords[id].sHeight, //'destination Height'
				crop: [FontSpriteCoords[id].sx, FontSpriteCoords[id].sy, FontSpriteCoords[id].sWidth, FontSpriteCoords[id].sHeight]

			});

			Risk.Territories[id] = {
				name: TerritoryNames[id],
				path: pathObject,
				nameImg: territoryNameImg,
				color: null,
				neighbours: Neighbours[id],
				armyNum: null
			};
		}
		
	},

	drawBackgroundImg: function() {
		Risk.backgroundLayer = new Kinetic.Layer({
			scale: Risk.Settings.globalScale
		});
		var imgObj = new Image();
		imgObj.src = 'Content/img/map_grey.jpg';
		
		var img = new Kinetic.Image({
			image: imgObj,
			//alpha: 0.8
		});
		Risk.backgroundLayer.add(img);
	},

	drawTerritories: function() {
		for (t in Risk.Territories) {
			
			var path = Risk.Territories[t].path;
			var nameImg = Risk.Territories[t].nameImg;
			var group = new Kinetic.Group();

			//We have to set up a group for proper mouseover on territories and sprite name images 
			group.add(path);
			group.add(nameImg);
			Risk.mapLayer.add(group);
			CountryGroupObjects[t] = group;
			//Basic animations 
			//Wrap the 'path', 't' and 'group' variables inside a closure, and set up the mouseover / mouseout events for the demo
			//when you make a bigger application you should move this functionality out from here, and maybe put these 'actions' in a seperate function/'class'
			(function(path, t, group) {
				//group.on('mouseover', function() {
				//	path.setFill('#eee');
				//	path.setOpacity(0.3);
				//	group.moveTo(Risk.topLayer);
				//	Risk.topLayer.drawScene();
				//});

				//group.on('mouseout', function() {
				//	path.setFill(Risk.Settings.colors[Risk.Territories[t].color]);
				//	path.setOpacity(0.4);
				//	group.moveTo(Risk.mapLayer);
				//	Risk.topLayer.draw();
				//});

				group.on('click', function() {
					//console.log(path.attrs.id);
					location.hash = path.attrs.id;
					mainEngine.Clicked(path.attrs.id);
				});
			})(path, t, group);
		}				
	},

	divideTerritories: function() {

		fillRandomColors();

		for(var id in Risk.Territories) {
			var color = Risk.Territories[id].color;
			
			var neighbours = Risk.Territories[id].neighbours;

			//a VERY simple algorithm to make the map more equal
			var similarNeighbours = 0;
			for(var i = 0; i < neighbours.length; i++) {

				var currNeighbour = neighbours[i];
				if (Risk.Territories[currNeighbour].color == color) {
					similarNeighbours++;
				}
			}

			//how many similar neighbours we allow
			if (similarNeighbours > 2) {
				var newColor = getRandomColor();
				while (color == newColor) {
					var newColor = getRandomColor();
				}
				Risk.Territories[id].color = newColor;

				Risk.Territories[id].path.setFill(Risk.Settings.colors[newColor]);
				Risk.Territories[id].path.setOpacity(0.4);				
			}
		}

		Risk.mapLayer.draw();

		function fillRandomColors() {
			for(var id in Risk.Territories) {
				var color = getRandomColor(id);
				Risk.Territories[id].color = color;
				Risk.Territories[id].path.setFill(Risk.Settings.colors[color]);
				Risk.Territories[id].path.setOpacity(0.4);			

			}
		}

		/**
		 * Returns a color name like 'yellow'
		 */
		function getRandomColor(id) {
		    var colors = ['yellow', 'green', 'blue', 'red', 'purple', 'cyan'];
			//Math.random() returns between [0, 1), so don't worry
			var randomNum = Math.floor(Math.random()*(colors.length)); 
			return CountryToContinent[id];
		}
	}
}
