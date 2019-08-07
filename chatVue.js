var socket = null;
var app = new Vue({
  // State 0: select username
  // State 1: chat application
  el: '#app',
  data: {
    messages: [],
    message: '',
    username: '',
    state: 0
  },
  methods: {
    sendMessage: function () {
      socket.emit('message', this.message);
      this.message = '';
    },
    setUsername: function () {
      socket.emit('join', this.username);
      this.username = '';
      this.state = 1;
    },
    continueWithoutUsername: function () {
      socket.emit('join', null);
      this.state = 1;
    }
  },
  created: function () {
    socket = io();
  },
  mounted: function () {
    socket.on('message', function (message) {
      app.messages.push(message);
      // this needs to be done AFTER vue updates the page!!
      app.$nextTick(function () {
        var messageBox = document.getElementById('chatbox');
        messageBox.scrollTop = messageBox.scrollHeight;
      });
    });
  }
});