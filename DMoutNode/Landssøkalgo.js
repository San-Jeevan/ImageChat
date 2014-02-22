var Neighbours = {
    Alaska: ['NorthWestTerritory', 'Alberta', 'Kamchatka'],
    NorthWestTerritory: ['Alberta', 'Alaska', 'Greenland'],
    Alberta: ['NorthWestTerritory', 'Alaska', 'Ontario', 'WesternUnitedStates'],
    Ontario: ['NorthWestTerritory', 'Alberta', 'WesternUnitedStates', 'EasternUnitedStates', 'Quebec', 'Greenland'],
    Greenland: ['NorthWestTerritory', 'Ontario', 'Quebec', 'Iceland'],
    Quebec: ['Ontario', 'EasternUnitedStates', 'Greenland'],
    WesternUnitedStates: ['Alberta', 'Ontario', 'EasternUnitedStates', 'CentralAmerica'],
    EasternUnitedStates: ['Quebec', 'Ontario', 'WesternUnitedStates', 'CentralAmerica'],
    CentralAmerica: ['WesternUnitedStates', 'EasternUnitedStates', 'Venezuela'],
    Peru: ['Venezuela', 'Brazil', 'Argentina'],
    Brazil: ['Venezuela', 'Peru', 'Argentina', 'NorthAfrica'],
    Venezuela: ['Peru', 'Brazil', 'CentralAmerica'],
    Argentina: ['Peru', 'Brazil'],
    NorthAfrica: ['Brazil', 'Congo', 'EastAfrica', 'Egypt', 'SouthernEurope', 'WesternEurope'],
    Egypt: ['NorthAfrica', 'EastAfrica', 'MiddleEast', 'SouthernEurope'],
    Congo: ['NorthAfrica', 'EastAfrica', 'SouthAfrica'],
    EastAfrica: ['Egypt', 'NorthAfrica', 'Congo', 'SouthAfrica', 'Madagascar', 'MiddleEast'],
    SouthAfrica: ['Congo', 'EastAfrica', 'Madagascar'],
    Iceland: ['Greenland', 'GreatBritain', 'Scandinavia'],
    GreatBritain: ['Iceland', 'Scandinavia', 'NorthernEurope', 'WesternEurope'],
    WesternEurope: ['GreatBritain', 'NorthernEurope', 'SouthernEurope', 'NorthAfrica'],
    NorthernEurope: ['Scandinavia', 'GreatBritain', 'WesternEurope', 'SouthernEurope', 'Ukraine'],
    SouthernEurope: ['Ukraine', 'NorthernEurope', 'WesternEurope', 'NorthAfrica', 'Egypt', 'MiddleEast'],
    Scandinavia: ['Iceland', 'GreatBritain', 'NorthernEurope', 'Ukraine'],
    Madagascar: ['SouthAfrica', 'EastAfrica'],
    Ukraine: ['Scandinavia', 'NorthernEurope', 'SouthernEurope', 'MiddleEast', 'Afghanistan', 'Ural'],
    MiddleEast: ['Ukraine', 'SouthernEurope', 'Egypt', 'EastAfrica', 'India', 'Afghanistan'],
    Afghanistan: ['Ural', 'Ukraine', 'MiddleEast', 'India', 'China'],
    Ural: ['Ukraine', 'Afghanistan', 'China', 'Siberia'],
    India: ['MiddleEast', 'Afghanistan', 'China', 'Siam'],
    Siam: ['Indonesia', 'China', 'India'],
    China: ['Mongolia', 'Siberia', 'Ural', 'Afghanistan', 'India', 'Siam'],
    Mongolia: ['Japan', 'Kamchatka', 'Irkutsk', 'Siberia', 'China'],
    Irkutsk: ['Kamchatka', 'Yakutsk', 'Siberia', 'Mongolia'],
    Yakutsk: ['Kamchatka', 'Irkutsk', 'Siberia'],
    Siberia: ['Ural', 'China', 'Mongolia', 'Irkutsk', 'Yakutsk'],
    Kamchatka: ['Alaska', 'Japan', 'Mongolia', 'Irkutsk', 'Yakutsk'],
    Japan: ['Kamchatka', 'Mongolia'],
    Indonesia: ['Siam', 'NewGuinea', 'WesternAustralia'],
    NewGuinea: ['Indonesia', 'WesternAustralia', 'EasternAustralia'],
    WesternAustralia: ['Indonesia', 'NewGuinea', 'EasternAustralia'],
    EasternAustralia: ['NewGuinea', 'WesternAustralia'],
}

var data = { "map": [{ "Country": "Alaska", "value": { "player": "H8n94-UVdQ5VE6zO0yR3", "force": 1 } }, { "Country": "NorthWestTerritory", "value": { "player": "8VBjfdXoWAE-OLRS0yR4", "force": 1 } }, { "Country": "Alberta", "value": { "player": "8VBjfdXoWAE-OLRS0yR4", "force": 1 } }, { "Country": "Ontario", "value": { "player": "8VBjfdXoWAE-OLRS0yR4", "force": 1 } }, { "Country": "Greenland", "value": { "player": "8VBjfdXoWAE-OLRS0yR4", "force": 1 } }, { "Country": "Quebec", "value": { "player": "H8n94-UVdQ5VE6zO0yR3", "force": 1 } }, { "Country": "WesternUnitedStates", "value": { "player": "8VBjfdXoWAE-OLRS0yR4", "force": 1 } }, { "Country": "EasternUnitedStates", "value": { "player": "8VBjfdXoWAE-OLRS0yR4", "force": 1 } }, { "Country": "CentralAmerica", "value": { "player": "H8n94-UVdQ5VE6zO0yR3", "force": 1 } }, { "Country": "Peru", "value": { "player": "8VBjfdXoWAE-OLRS0yR4", "force": 1 } }, { "Country": "Brazil", "value": { "player": "8VBjfdXoWAE-OLRS0yR4", "force": 1 } }, { "Country": "Venezuela", "value": { "player": "H8n94-UVdQ5VE6zO0yR3", "force": 1 } }, { "Country": "Argentina", "value": { "player": "8VBjfdXoWAE-OLRS0yR4", "force": 1 } }, { "Country": "NorthAfrica", "value": { "player": "H8n94-UVdQ5VE6zO0yR3", "force": 1 } }, { "Country": "Egypt", "value": { "player": "H8n94-UVdQ5VE6zO0yR3", "force": 1 } }, { "Country": "Congo", "value": { "player": "8VBjfdXoWAE-OLRS0yR4", "force": 1 } }, { "Country": "EastAfrica", "value": { "player": "H8n94-UVdQ5VE6zO0yR3", "force": 1 } }, { "Country": "SouthAfrica", "value": { "player": "H8n94-UVdQ5VE6zO0yR3", "force": 1 } }, { "Country": "Iceland", "value": { "player": "8VBjfdXoWAE-OLRS0yR4", "force": 1 } }, { "Country": "GreatBritain", "value": { "player": "H8n94-UVdQ5VE6zO0yR3", "force": 1 } }, { "Country": "WesternEurope", "value": { "player": "8VBjfdXoWAE-OLRS0yR4", "force": 1 } }, { "Country": "NorthernEurope", "value": { "player": "8VBjfdXoWAE-OLRS0yR4", "force": 1 } }, { "Country": "SouthernEurope", "value": { "player": "8VBjfdXoWAE-OLRS0yR4", "force": 1 } }, { "Country": "Scandinavia", "value": { "player": "H8n94-UVdQ5VE6zO0yR3", "force": 1 } }, { "Country": "Madagascar", "value": { "player": "H8n94-UVdQ5VE6zO0yR3", "force": 1 } }, { "Country": "Ukraine", "value": { "player": "8VBjfdXoWAE-OLRS0yR4", "force": 1 } }, { "Country": "MiddleEast", "value": { "player": "H8n94-UVdQ5VE6zO0yR3", "force": 1 } }, { "Country": "Afghanistan", "value": { "player": "8VBjfdXoWAE-OLRS0yR4", "force": 1 } }, { "Country": "Ural", "value": { "player": "8VBjfdXoWAE-OLRS0yR4", "force": 1 } }, { "Country": "India", "value": { "player": "H8n94-UVdQ5VE6zO0yR3", "force": 1 } }, { "Country": "Siam", "value": { "player": "8VBjfdXoWAE-OLRS0yR4", "force": 1 } }, { "Country": "China", "value": { "player": "H8n94-UVdQ5VE6zO0yR3", "force": 1 } }, { "Country": "Mongolia", "value": { "player": "8VBjfdXoWAE-OLRS0yR4", "force": 1 } }, { "Country": "Irkutsk", "value": { "player": "H8n94-UVdQ5VE6zO0yR3", "force": 1 } }, { "Country": "Yakutsk", "value": { "player": "8VBjfdXoWAE-OLRS0yR4", "force": 1 } }, { "Country": "Siberia", "value": { "player": "H8n94-UVdQ5VE6zO0yR3", "force": 1 } }, { "Country": "Kamchatka", "value": { "player": "H8n94-UVdQ5VE6zO0yR3", "force": 1 } }, { "Country": "Japan", "value": { "player": "H8n94-UVdQ5VE6zO0yR3", "force": 1 } }, { "Country": "Indonesia", "value": { "player": "H8n94-UVdQ5VE6zO0yR3", "force": 1 } }, { "Country": "NewGuinea", "value": { "player": "8VBjfdXoWAE-OLRS0yR4", "force": 1 } }, { "Country": "WesternAustralia", "value": { "player": "H8n94-UVdQ5VE6zO0yR3", "force": 1 } }, { "Country": "EasternAustralia", "value": { "player": "H8n94-UVdQ5VE6zO0yR3", "force": 1 } }], "players": ["H8n94-UVdQ5VE6zO0yR3", "8VBjfdXoWAE-OLRS0yR4"] };

var players = [];
var Country = [];

for (var i = 0; i < data.map.length; i++) {
    players = data.players;
    var country = data.map[i].Country;
    var player = data.map[i].value.player;
    var force = data.map[i].value.force;
    Country.push({ country: country, player: player, force: force });
}
var mynick = players[0];


var AttackLand = "Alaska";
var DefLand = "SouthAfrica";

function dfs(from_land, to_land) {
    var playersterritory_pre = _.where(Country, { player: "H8n94-UVdQ5VE6zO0yR3" });
    var playersterritory = [];

    for (var i = 0; i < playersterritory_pre.length; i++) {
        playersterritory.push(playersterritory_pre[i].country);
    }

    var queue = _.intersection(Neighbours[from_land], playersterritory);
    var visited = [];
    var next = queue.shift();

    while (next) {
        visited.push(next);
        if (next == to_land) return true;
        var naboer = Neighbours[next];

        for (var i = 0; i < naboer.length; i++) {
            if (queue.indexOf(naboer[i]) == -1 && visited.indexOf(naboer[i]) == -1 && playersterritory.indexOf(naboer[i]) != -1) queue.push(naboer[i]);
        }
        next = queue.shift();
    }
    return false;
}

console.log(dfs(AttackLand, DefLand));
