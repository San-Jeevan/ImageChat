var randomcountry = ['Alaska', 
	'NorthWestTerritory', 
	'Alberta', 
	'Ontario', 
	'Greenland', 
	'Quebec', 
	'WesternUnitedStates', 
	'EasternUnitedStates', 
	'CentralAmerica', 
	'Peru', 
	'Brazil', 
	'Venezuela', 
	'Argentina', 
	'NorthAfrica', 
	'Egypt', 
	'Congo', 
	'EastAfrica', 
	'SouthAfrica', 
	'Iceland', 
	'GreatBritain', 
	'WesternEurope', 
	'NorthernEurope', 
	'SouthernEurope', 
	'Scandinavia', 
	'Madagascar', 
	'Ukraine', 
	'MiddleEast', 
	'Afghanistan', 
	'Ural', 
	'India', 
	'Siam', 
	'China', 
	'Mongolia', 
	'Irkutsk', 
	'Yakutsk', 
	'Siberia', 
	'Kamchatka', 
	'Japan', 
	'Indonesia', 
	'NewGuinea', 
	'WesternAustralia', 
	'EasternAustralia'];

var randomcountry2 = ['Alaska', 
	'NorthWestTerritory', 
	'Alberta', 
	'Ontario', 
	'Greenland', 
	'Quebec', 
	'WesternUnitedStates', 
	'EasternUnitedStates', 
	'CentralAmerica', 
	'Peru', 
	'Brazil', 
	'Venezuela', 
	'Argentina', 
	'NorthAfrica', 
	'Egypt', 
	'Congo', 
	'EastAfrica', 
	'SouthAfrica', 
	'Iceland', 
	'GreatBritain', 
	'WesternEurope', 
	'NorthernEurope', 
	'SouthernEurope', 
	'Scandinavia', 
	'Madagascar', 
	'Ukraine', 
	'MiddleEast', 
	'Afghanistan', 
	'Ural', 
	'India', 
	'Siam', 
	'China', 
	'Mongolia', 
	'Irkutsk', 
	'Yakutsk', 
	'Siberia', 
	'Kamchatka', 
	'Japan', 
	'Indonesia', 
	'NewGuinea', 
	'WesternAustralia', 
	'EasternAustralia'];

    

var country = [];
    country['Alaska'] = {};
	country['NorthWestTerritory'] = {};
	country['Alberta'] = {};
	country['Ontario'] = {};
	country['Greenland'] = {};
	country['Quebec'] = {};
	country['WesternUnitedStates'] = {};
	country['EasternUnitedStates'] = {};
	country['CentralAmerica'] = {};
	country['Peru'] = {};
	country['Brazil'] = {};
	country['Venezuela'] = {};
	country['Argentina'] = {};
	country['NorthAfrica'] = {};
	country['Egypt'] = {};
	country['Congo'] = {};
	country['EastAfrica'] = {};
	country['SouthAfrica'] = {};
	country['Iceland'] = {};
	country['GreatBritain'] = {};
	country['WesternEurope'] = {};
	country['NorthernEurope'] = {};
	country['SouthernEurope'] = {};
	country['Scandinavia'] = {};
	country['Madagascar'] = {};
	country['Ukraine'] = {};
	country['MiddleEast'] = {};
	country['Afghanistan'] = {};
	country['Ural'] = {};
	country['India'] = {};
	country['Siam'] = {};
	country['China'] = {};
	country['Mongolia'] = {};
	country['Irkutsk'] = {};
	country['Yakutsk'] = {};
	country['Siberia'] = {};
    country['Kamchatka'] = {};
	country['Japan'] = {};
	country['Indonesia'] = {};
	country['NewGuinea'] = {};
	country['WesternAustralia'] = {};
	country['EasternAustralia'] = {};

players = ["1", "2", "3", "4"];

$('#count').click( function() {
   var player1 = 0;
    var player2 = 0;
    var player3 = 0;
    var player4 = 0;
 for (var i = 0; i <  randomcountry2.length; i++) {
    switch(country[randomcountry2[i]].player)
{
case 1:
  player1 += 1;
  break;
case 2:
   player2 += 1;
  break;
        case 3:
   player3 += 1;
  break;
        case 4:
   player4 += 1;
  break;
default:
break;
}

   }
    console.log("player1: " + player1) ;
     console.log("player2: " + player2) ;
     console.log("player3: " + player3) ;
     console.log("player4: " + player4) ;

});


$('#test').click(function () {
    var currentplayer = 0;

    for (var i = 0; i < 42; i++) {
        var randomid = Math.floor(Math.random() * randomcountry.length - 1) + 1;
        country[randomcountry[randomid]] = { player: players[currentplayer], force: 1 };

        if (randomid > -1) {
            randomcountry.splice(randomid, 1);
        }
        if (currentplayer != players.length - 1) currentplayer += 1;
        else currentplayer = 0;
    }

});