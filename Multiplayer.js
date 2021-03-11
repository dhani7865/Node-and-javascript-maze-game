
module.exports = {

    ChatMessage: function(username, message) {
        var chat = {
            name: username,
            msg: message
        };
        return chat;
    }

};

