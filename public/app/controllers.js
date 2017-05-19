angular.module('MainCtrls', ['MainServices'])
    .controller('HomeCtrl', ['$scope', 'Item', function($scope, Item) {
        $scope.items = [];

        Item.query(function success(data) {
            $scope.items = data;
        }, function error(data) {
            console.log(data);
        });

        $scope.deleteItem = function(id, itemsIdx) {
            Item.delete({ id: id }, function success(data) {
                $scope.items.splice(itemsIdx, 1);
            }, function error(data) {
                console.log(data);
            });
        }
    }])
    .controller('ShowCtrl', ['$scope', '$stateParams', 'Item', function($scope, $stateParams, Item) {
        $scope.item = {};

        Item.get({ id: $stateParams.id }, function success(data) {
            $scope.item = data;
        }, function error(data) {
            console.log(data);
        });
    }])
    .controller('NewCtrl', ['$scope', '$location', 'Item', 'Alerts', function($scope, $location, Item, Alerts) {
        console.log('in NewCtrl')
        $scope.item = {
            title: '',
            description: '',
            image: ''
        };

        $scope.createItem = function() {
            Item.save($scope.item, function success(data) {
                $location.path('/');
            }, function error(data) {
                Alerts.add('danger', 'You must be logged in to add')
                console.log(data);
            });
        }
    }])
    .controller('NavCtrl', ['$scope', 'Auth', '$state', 'Alerts', function($scope, Auth, $state, Alerts) {
        $scope.Auth = Auth;
        $scope.logout = function() {
            Auth.removeToken();
            Alerts.add('success', 'Logged out!');
            $state.reload();
        };
    }])
    .controller('SignupCtrl', ['$scope', '$http', '$location', 'Auth', 'Alerts', function($scope, $http, $location, Auth, Alerts) {
        $scope.user = {
            email: '',
            password: ''
        };
        $scope.userSignup = function() {
            $http.post('/api/users', $scope.user).then(function success(res) {
                    $location.path('/');
                },
                function error(res) {
                    Alerts.add('danger', 'Error. See console');
                    console.log(res);
                });
            $http.post('/api/auth', $scope.user).then(function success(res) {
                Auth.saveToken(res.data);
                Alerts.add('success', 'Signed up & Logged in!');
                console.log('Token:', res.data);
                $location.path('/');
            }, function error(res) {
                Alerts.add('danger', 'Incorrect email/password');
                console.log(res);
            });
        }
    }])
    .controller('LoginCtrl', ['$scope', '$http', '$location', 'Auth', 'Alerts', function($scope, $http, $location, Auth, Alerts) {
        $scope.user = {
            email: '',
            password: ''
        };
        $scope.userLogin = function() {
            $http.post('/api/auth', $scope.user).then(function success(res) {
                Auth.saveToken(res.data);
                Alerts.add('success', 'Logged in!');
                console.log('Token:', res.data);
                $location.path('/');
            }, function error(res) {
                Alerts.add('danger', 'Incorrect email/password');
                console.log(res);
            });
        }
    }])
    .controller('AlertCtrl', ['$scope', 'Alerts', function($scope, Alerts) {
        $scope.Alerts = Alerts;
    }])
    .controller('NewEventCtrl', ['$scope', '$location', 'Event', 'Alerts', function($scope, $location, Event, Alerts) {
        console.log('in NewEventCtrl')
        $scope.event = {

        };

        $scope.createEvent = function() {
            Event.save($scope.event, function success(data) {
                $location.path('/');
            }, function error(data) {
                Alerts.add('danger', 'You must be logged in to add')
                console.log(data);
            });
        };
    }])
    .controller('EventCtrl', ['$scope', '$stateParams', 'Event', function($scope, $stateParams, Event) {
        $scope.event = {};

        Event.get({ id: $stateParams.id }, function success(data) {
            $scope.event = data;
        }, function error(data) {
            console.log(data);
        });
    }])
    .controller('NewGroupCtrl', ['$scope', '$location', 'Group', 'Alerts', function($scope, $location, Group, Alerts) {
        console.log('in NewGroupCtrl');
        $scope.group = {
            name: '',
            description: '',
            image: ''
        };

        $scope.createGroup = function() {
            Group.save($scope.group, function success(data) {
                $location.path('/');
            }, function error(data) {
                Alerts.add('danger', 'You must be logged in to add')
                console.log(data);
            });
        };
    }])

.controller('GroupCtrl', ['$scope', '$stateParams', 'Group', function($scope, $stateParams, Group) {
    $scope.group = {};

    Group.get({ id: $stateParams.id }, function success(data) {
        $scope.group = data;
    }, function error(data) {
        console.log(data);
    });
}]);
