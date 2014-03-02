var io = require('socket.io').listen(1337);
var _ = require('underscore')._;

var rooms = [];
var playerlist = [];

var accepted_extensions = ['jpg', 'jpeg', 'png', 'bmp'];

var recent_images = [];

process.on('uncaughtException', function (error) {
    console.log(error.stack);
});

io.sockets.on('connection', function (socket) {


    //var playerList = [];
    //var playerArray = io.sockets.clients();
    //for (var i = 0; i < playerArray.length; i++) {
    //    playerList.push(playerArray[i].id);
    //}
    //socket.emit('s:playerlist', playerList);
    //socket.broadcast.emit('s:playerjoined', socket.id);
    socket.emit('s:recentimages', recent_images);


    function randomName() {
        var randomnumber = Math.floor(Math.random() * 11);
        var name = "Guest" + randomnumber;
    }

    function randomGUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) { var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8; return v.toString(16); });
    }

    socket.on('disconnect', function () {
        var rooms = _.omit(io.sockets.manager.roomClients[socket.id], '');
        rooms = _.keys(rooms);
        rooms.forEach(function (room) {
            io.sockets.in(room.substring(1)).emit("s:playerleft", socket.nickname);
        });

        playerlist = _.reject(playerlist, function (player) { return player.nickname == socket.nickname });
    });

    socket.on('c:msg', function (data) {
        var msg = {};
        msg.time = new Date();
        msg.username = socket.nickname;
        msg.content = data;
        io.sockets.emit('s:msg', msg);
    });

    socket.on('c:changename', function (data) {
        console.log(_.findWhere(playerlist, {nickname: data.nickname}));
        
        if (_.findWhere(playerlist, {nickname: data.nickname})!=undefined) {
              socket.emit('s:changename', 404);
              return;
            }
        playerlist.push({nickname: data.nickname, id:socket.id});
        socket.nickname = data.nickname;
        socket.emit('s:changename', 200);
    });

    socket.on('c:joinroom', function (data) {
        if (socket.nickname==undefined) return;
        socket.join(data.room);
        socket.emit('s:joinroom', 200);
        socket.emit('s:playerlist', _.pluck(io.sockets.clients(data.room), 'nickname'));
        socket.broadcast.to(data.room).emit('s:playerjoined', socket.nickname);
   
    });

    socket.on('c:leaveroom', function () {
        var rooms = _.omit(io.sockets.manager.roomClients[socket.id], '');
        rooms = _.keys(rooms);
        rooms.forEach(function (room) {
            io.sockets.in(room.substring(1)).emit("s:playerleft", socket.nickname);
            socket.leave(room.substring(1));
        });
        socket.emit('s:leaveroom', 200);

    });

    socket.on('c:lobbyimage', function (data) {
        if (data== '' || data==undefined) return;
        if (_.indexOf(accepted_extensions, data.substring(data.length-3)) == -1) return;
        var msg = {};
        msg.time = new Date();
        msg.username = socket.nickname;
        msg.url = data;
        recent_images.push(msg);
        if (recent_images.length > 10) recent_images.shift();
        io.sockets.emit('s:lobbyimage', msg);
    });


});