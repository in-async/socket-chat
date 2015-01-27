$(function () {
    var socket = io();
    
    $('form').submit(function () {
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });
    $(document).on('beforeunload', function (e) {
        socket.emit('logout');
    });
    
    socket.on('connect', function () {
    })
    .on('connected', function (data) {
        console.log(data);
        socket.emit('user login', user);
    })
    .on('disconnect', function () {
        socket.emit('chat message', 'logoff')
    })
    .on('chat message', function (data) {
        addMessage(data.message);
    })
    .on('enter', function (data) {
        addMessage('#{user}' + data.message);
    })
    .on('exit', function (data) {
        addMessage(data.message);
    })
    ;
    function addMessage(msg) {
        $('#messages').append($('<li>').text(msg));
    }

    var isType = false;
    $('#m').keyup(function () {
        if ($('#m').val() == '') {
            isType = false;
            socket.emit('cancel typing', user.name);
        } else if (!isType) {
            console.log('hoge');
            isType = true;
            socket.emit('start typing', user.name);
        }
    });
    socket.on('cancel typing', function (data) {
        $('#messages > li').each(function () {
            if ($(this).text() == data.message) {
                $(this).remove();
                return;
            }
        });
    });
});
