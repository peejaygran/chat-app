shappyWise.controller('ChatCtrl', ['$rootScope', '$scope', 'PubNub', function($rootScope, $scope, PubNub) {
    $scope.chatList = [];
    $scope.messages = [];
    $scope.userId = "Rich";
    $scope.withEmoji = false;
    $scope.newMessagesCounter = 0;
    $scope.CurrentDate = new Date();
    $scope.channel = ['Rich-Christel-Shappywise', 'Rich-John-Shappywise', 'Rich-Charlotte-Shappywise', 'Rich-Boom-Shappywise'];
    $scope.createNewMessage = [{ msg: '' }, { msg: '' }, { msg: '' }];

    $scope.newMsgAudio = function () {
        var audio = new Audio('audio/newMsg.m4a');
        audio.play();
    };

    $scope.sendEmoji = function (messageIndex, dedicatedChannel) {
        if ($rootScope.online) {
            $scope.createNewMessage[messageIndex] = '';
            $scope.withEmoji = true;
            $scope.sendEmojiAudio();
            $scope.publish(messageIndex, dedicatedChannel);
        }
    };

    $scope.sendEmojiAudio = function() {
        var audio = new Audio('audio/blop.mp3');
        audio.play();
    };

    $scope.closed = function() {
        if ($scope.isClosed) {
            $scope.isClosed = false;
            $scope.counter = 0;
            $scope.newMessagesCounter = 0;
        } else {
            $scope.counter = $scope.messages.length;
            $scope.isClosed = true;
        }
    };

    $scope.newMessageArrived = function() {
        if ($scope.isClosed && ($scope.counter != $scope.messages.length)) {
            $scope.newMsgAudio();
            $scope.newMessagesCounter = $scope.messages.length - $scope.counter;
        }
    };

    $scope.addPeopleFromChatlist = function(value) {
        if ($rootScope.online) {
            if ($scope.chatList.indexOf(value) != -1) {
                $scope.chatList.splice($scope.chatList.indexOf(value), 1);
                $scope.chatList.unshift(value);
            } else {
                $scope.chatList.push(value);
            }
        }
    };

    $scope.removePeopleFromChatlist = function(value) {
        $scope.chatList.splice($scope.chatList.indexOf(value), 1);
    };

    if (!$rootScope.initialized) {
        PubNub.init({
            subscribe_key: 'sub-c-d2c6bd3e-3551-11e7-9843-0619f8945a4f',
            publish_key: 'pub-c-32fd1f89-fcb4-4318-949a-5bfe2fcc9fd3',
            uuid: $scope.userId,
            ssl: true
        });
        $rootScope.initialized = true;
    }

    angular.forEach($scope.channel, function(value, key) {
        PubNub.ngSubscribe({ channel: value });
    });

    $scope.publish = function(messageIndex, dedicatedChannel) {
        PubNub.ngPublish({
            channel: dedicatedChannel,
            message: {
                id: $scope.userId,
                date: $scope.CurrentDate,
                content: $scope.createNewMessage[messageIndex].msg,
                hasEmoji: $scope.withEmoji,
                senderChannel: dedicatedChannel
            },
        });
        $scope.createNewMessage[messageIndex].msg = '';
        $scope.withEmoji = false;
    };

    angular.forEach($scope.channel, function(value, key) {
        $rootScope.$on(PubNub.ngMsgEv(value), function(ngEvent, payload) {
            $scope.$apply(function() {
                $scope.messages.push(payload.message);
            });
        });
    });

    angular.forEach($scope.channel, function(value, key) {
        $rootScope.$on(PubNub.ngPrsEv(value), function(ngEvent, payload) {
            $scope.$apply(function() {
                $scope.users = PubNub.ngListPresence(value);
            });
        });
    });

    angular.forEach($scope.channel, function(value, key) {
        PubNub.ngHereNow({
            channel: value,
        });
    });

    angular.forEach($scope.channel, function(value, key) {
        PubNub.ngHistory({
            channel: value,
            count: 100
        });
    });


}]);
