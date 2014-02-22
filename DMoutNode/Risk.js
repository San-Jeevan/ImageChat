var io = require('socket.io').listen(1337);
var Game = require('./game.js');
var _ = require('underscore')._;
var GameMove = require('./gameMove.js');

var games = [];
var rooms = [];

process.on('uncaughtException', function (error) {
   console.log(error.stack);
});

io.sockets.on('connection', function (socket) {


       var playerList = [];
       var playerArray = io.sockets.clients();
        for (var i = 0; i < playerArray.length; i++) {
           
            playerList.push(playerArray[i].id);
            console.log(playerArray[i].id);
        }
    socket.emit('s:playerlist', playerList);
    socket.broadcast.emit('s:playerjoined', socket.id);
   io.sockets.emit('s:gamelist', _.map(rooms, function(room){ return {title: room.title, id: room.id, host: room.host, maxplayers: room.maxplayers} }));


    function randomGUID () {
       return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
        }
    
    function gameLoop(gameid) {
        var game = games[gameid];
        if (game.state == 0) {
            game.state = 1;
            game.gamePhase = { turn: 0, type: GameMove.PlaceTroops, force: 3 };
            for (var i = 0; i < game.players.length; i++) {
                io.sockets.socket(game.players[i]).emit('turn', { type: GameMove.PlaceTroops, force: 3, turn: 0});
            }
            var gameTimerId = setTimeout(function() {
                gameLoop(gameid);
            }, 100000);
            game.setTimer(gameTimerId);
            games[gameid] = game;
        } else {
            var nextmove =  game.timeoutMove();
            for (var i2 = 0; i2 < game.players.length; i2++) {
                io.sockets.socket(game.players[i2]).emit('playeraction', nextmove.lastMove);
                io.sockets.socket(game.players[i2]).emit('turn', nextmove.nextMove);
            }
            var gameTimerId2 = setTimeout(function() {
                gameLoop(gameid);
            }, 10000);
            game.setTimer(gameTimerId2);
            games[gameid] = game;
        }
    }

    function initPhaseLoop(gameid, move) {
        
        var game = games[gameid];
        rooms.push({id: gameid, title: game.title, maxPlayers: game.maxPlayers});
         socket.broadcast.emit('s:gamelist', gamesMeta)

        var map = game.initPhaseDeployRandom();
        var players = game.players;
        var formattedmap = [];
        for (var hashkey in game.country) {
            if (game.country.hasOwnProperty(hashkey)) {
                formattedmap.push({ Country: hashkey, value: game.country[hashkey] });
            }
        }

        for (var i = 0; i < players.length; i++) {
            io.sockets.socket(players[i]).emit('initphasemap', {
                map:
                formattedmap, players:
                game.players
            }
    );
        }


        setTimeout(function () {
            gameLoop(gameid);
        }, 1000);

    }

    function gamePhaseLoop () {}

    function issueGameList () {
        
        }
    
    function startGame(playerArray) {
        var playerList = [];
        for (var i = 0; i < playerArray.length; i++) {
            playerList.push(playerArray[i].id);
            console.log(playerArray[i].id);
        }
       var id = 1337;
       var game = new Game(playerList,id,0, 'test game', 4);
       games[id] = game;
       initPhaseLoop(1337,game);
    }
 
    socket.on('startGame', function () {
        startGame(io.sockets.clients());
    });

    socket.on('createGame', function (data) {
        console.log(data);
    });

    socket.on('c:gamelist', function () {

        socket.broadcast.emit('s:gamelist', _.map(rooms, function(room){ return {title: room.title, id:room.id, host: room.host, maxplayers:room.maxplayers} }));
    });

    socket.on('disconnect', function () {
        io.sockets.emit('s:playerleft', socket.id);

       var rooms = _.omit(io.sockets.manager.roomClients[socket.id], '');
       rooms = _.keys(rooms);
       rooms.forEach(function (room) {
            io.sockets.in(room.substring(1)).emit("s:roomplayerleft", socket.id);
        });
    });

    socket.on('c:lobbymessage', function (data) {
        var msg = {};
        msg.time = new Date();
        msg.username = socket.id
        msg.content = data;
        io.sockets.emit('s:lobbymessage', msg );
    });



    socket.on('c:newgame', function (data) {
        //check if game with same name exists
        if (_.findWhere(rooms, {title: data.name}) != undefined) return;
        //check if host has other games running
        if (_.findWhere(rooms, {host: socket.id}) != undefined) return;
        //create mapping between gameid and roomname which is GUID
        //set room properties. max players
        var room = {};
        room.roomname = randomGUID();
        room.id = randomGUID();
        room.title = data.name;
        room.host = socket.id;
        room.maxplayers = data.players;
        rooms.push(room);
        //send it back to client
        io.sockets.emit('s:gamelist', _.map(rooms, function(room){ return {title: room.title, id: room.id, host: room.host, maxplayers: room.maxplayers} }));
        socket.emit('s:newgame', {status: 200, roomid : room.id});
       
    });


    socket.on('c:joinroom', function (data) {
        var room = _.findWhere(rooms, { id: data.id });
        var my_rooms = _.omit(io.sockets.manager.roomClients[socket.id], '');
        my_rooms = _.keys(my_rooms);
        if (typeof room === 'undefined') return;
        if (room.maxplayers == io.sockets.clients(room.roomname).length) return;
        if (my_rooms.length != 0) return;
        socket.join(room.roomname);
        console.log(io.sockets.clients(room.roomname));
        socket.emit('s:joinroom', {status: 200, roomid: room.id});
        socket.emit('s:roomplayerlist', _.pluck(io.sockets.clients(room.roomname), 'id'));
        socket.broadcast.to(room.roomname).emit('s:roomplayerjoined', socket.id);
   
    });

    socket.on('c:leaveroom', function () {
        var rooms = _.omit(io.sockets.manager.roomClients[socket.id], '');
        rooms = _.keys(rooms);
        rooms.forEach(function (room) {
            io.sockets.in(room.substring(1)).emit("s:roomplayerleft", socket.id);
            socket.leave(room.substring(1));
        });
        socket.emit('s:leaveroom', 200);

    });

    socket.on('c:startgame', function (gameid) {
        var theroom = _.findWhere(rooms, {roomid: gameid});
        if (theroom.host != socket.id) return;
     
        socket.emit('s:leaveroom', 200);

    });





});