var gameMove = require('./gameMove.js');
var _ = require('underscore')._;
var randomcountry= ['Alaska', 
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

var SouthAmerica = ['Peru', 'Venezuela', 'Argentina', 'Brazil'];
var Asia = ['Japan','Kamchatka','Siberia', 'Yakutsk', 'Irkutsk', 'Mongolia','China','Siam' ,'India', 'Ural', 'Afghanistan','MiddleEast'];
var Europe = ['Iceland','GreatBritain',	'WesternEurope', 'NorthernEurope', 'SouthernEurope', 'Scandinavia','Ukraine' ];
var Africa = [	'NorthAfrica','Egypt', 'Congo', 'EastAfrica', 'SouthAfrica', 'Madagascar' ];
var Oceania = ['Indonesia', 'NewGuinea', 'WesternAustralia', 'EasternAustralia'];
var NorthAmerica = ['Alaska','NorthWestTerritory', 'Alberta', 'Ontario', 'Greenland', 'Quebec', 'WesternUnitedStates', 'EasternUnitedStates', 'CentralAmerica' ];





function Game(playerArray, id, currentState, title, maxPlayers) {
    this.title = title;
    this.maxPlayers = maxPlayers;
    this.players = [];
    for (var i = 0; i < playerArray.length; i++) {
            // ReSharper disable once UseOfImplicitGlobalInFunctionScope
            this.players.push(playerArray[i]);
        }
    this.id = id;
    this.timer = 0;
    this.state = currentState; //0 = init, 1 = game, 2 = finished
    this.initPhase = {troopsdeployed: 0, turn: 0};
    this.gamePhase = {turn: 0, type: gameMove.PlaceTroops, force: 0 };
    this.lastMove = {};

    this.country = [];
    this.country['Alaska'] = {};
    this.country['NorthWestTerritory'] = {};
    this.country['Alberta'] = {};
    this.country['Ontario'] = {};
    this.country['Greenland'] = {};
    this.country['Quebec'] = {};
    this.country['WesternUnitedStates'] = {};
    this.country['EasternUnitedStates'] = {};
    this.country['CentralAmerica'] = {};
    this.country['Peru'] = {};
    this.country['Brazil'] = {};
    this.country['Venezuela'] = {};
    this.country['Argentina'] = {};
    this.country['NorthAfrica'] = {};
    this.country['Egypt'] = {};
    this.country['Congo'] = {};
    this.country['EastAfrica'] = {};
    this.country['SouthAfrica'] = {};
    this.country['Iceland'] = {};
    this.country['GreatBritain'] = {};
    this.country['WesternEurope'] = {};
    this.country['NorthernEurope'] = {};
    this.country['SouthernEurope'] = {};
    this.country['Scandinavia'] = {};
    this.country['Madagascar'] = {};
    this.country['Ukraine'] = {};
    this.country['MiddleEast'] = {};
    this.country['Afghanistan'] = {};
    this.country['Ural'] = {};
    this.country['India'] = {};
    this.country['Siam'] = {};
    this.country['China'] = {};
    this.country['Mongolia'] = {};
    this.country['Irkutsk'] = {};
    this.country['Yakutsk'] = {};
    this.country['Siberia'] = {};
    this.country['Kamchatka'] = {};
    this.country['Japan'] = {};
    this.country['Indonesia'] = {};
    this.country['NewGuinea'] = {};
    this.country['WesternAustralia'] = {};
    this.country['EasternAustralia'] = {};
};

Game.prototype.PlayerDropped = function(playerid) {

};


  function nextTurn () {
    if (this.gamePhase.turn != this.players.length - 1) this.gamePhase.turn += 1;
    else this.gamePhase.turn = 0;
 };


function countTroopsForNextRound(playerid) {
    var count = 0;
    var countriesOwned = [];
    for (var key in this.country) {
        if (this.country.hasOwnProperty(key)) {
            if (this.country[key].player == playerid) {
                count++;
                countriesOwned.push(key);
            }
        }
    }
    count = count < 9 ? 3 : parseInt(count / 3);

    if (_.intersection(countriesOwned, Europe).length == 7) count += 5;
    if (_.intersection(countriesOwned, SouthAmerica).length == 4) count += 2;
    if (_.intersection(countriesOwned, NorthAmerica).length == 8) count += 5;
    if (_.intersection(countriesOwned, Asia).length == 12) count += 7;
    if (_.intersection(countriesOwned, Africa).length == 6) count += 3;
    if (_.intersection(countriesOwned, Oceania).length == 4) count += 2;

    return count;

};


  Game.prototype.timeoutMove = function () {

      var target = '';
      
      if (this.gamePhase.type == gameMove.PlaceTroops) {
          for (var key in this.country) {
              if (this.country.hasOwnProperty(key)) {
                  if (this.country[key].player == this.players[this.gamePhase.turn]) {
                      this.country[key].force += this.gamePhase.force;
                      target = key;
                      break;
                  }
              }
          }
          this.gamePhase.type = gameMove.Attack;
          var lastMove2 = {player: this.players[this.gamePhase.turn], type: gameMove.PlaceTroops, force: this.gamePhase.force, country: target, totalforce: this.country[target].force };
          return { nextMove: this.gamePhase, lastMove: lastMove2};
          return this.gamePhase;
      }
      else if (this.gamePhase.type == gameMove.Attack) {
          this.gamePhase.type = gameMove.MoveTroops;
          return { nextMove: this.gamePhase, lastMove: {}};
      }

      else if (this.gamePhase.type == gameMove.MoveTroops) {
          this.gamePhase.type = gameMove.PlaceTroops;
          
          if (this.gamePhase.turn != this.players.length-1) this.gamePhase.turn += 1;
          else this.gamePhase.turn = 0;
          
          var countries = countTroopsForNextRound(this.players[this.gamePhase.turn]);
          this.gamePhase.force = countries;
          return { nextMove: this.gamePhase, lastMove: {}};
      }
      return 'ERROR: GAME IS OUT OF SYNC';
  };


Game.prototype.initPhaseDeploy = function(move) {
    if (this.players[this.initPhase.turn] != move.player) return false;
    if (Object.keys(this.country[move.country]).length === 0) return false;
    this.country[move.country] = {player: move.player, force: 1};
    return true;
};


Game.prototype.initPhaseDeployRandom = function() {
  var currentplayer = 0;
    for (var i = 0; i < 42; i++) {
        var randomid = Math.floor(Math.random() * randomcountry.length - 1) + 1;
        this.country[randomcountry[randomid]] = { player: this.players[currentplayer], force: 1 };

        if (randomid > -1) {
            randomcountry.splice(randomid, 1);
        }
        if (currentplayer != this.players.length - 1) currentplayer += 1;
        else currentplayer = 0;
    }
    return this.country;
};

Game.prototype.setTimer = function(timerid) {
    this.timer = timerid;
};

Game.prototype.getTimer = function() {
    return this.timer;
};

Game.prototype.isValidMove = function (playerid) {
    return true;
};

Game.prototype.isValidAttack = function (playerid) {
    return true;
};

Game.prototype.isValidDeployment = function (playerid) {
    return true;
};

module.exports = Game;



