angular.module('MainCtrls', ['MainServices'])
    .controller('GroupsCtrl', ['$scope', 'Group', function($scope, Group) {
        console.log('in GroupsCtrl')
        $scope.groups = [];

        Group.query(function success(data) {
            console.log('success', data)
            $scope.groups = data;
        }, function error(data) {
            console.log('fail', data);
        });

        $scope.deleteGroup = function(id, groupsIdx) {
            Group.delete({ id: id }, function success(data) {
                $scope.groups.splice(groupsIdx, 1);
            }, function error(data) {
                console.log(data);
            });
        }
    }])
    .controller('NewGroupCtrl', ['$scope', '$location', 'Group', 'Alerts', function($scope, $location, Group, Alerts) {
        console.log('in NewGroupCtrl');
        $scope.createGroup = function() {
            Group.save($scope.group, function success(data) {
                console.log($scope.group)
                $location.path('/');
            }, function error(data) {
                Alerts.add('danger', 'You must be logged in to add')
                console.log(data);
            });
        };
    }])
    .controller('GroupShowCtrl', ['$scope', '$stateParams', 'Group', function($scope, $stateParams, Group) {
        $scope.group = {};

        Group.get({ id: $stateParams.id }, function success(data) {
            $scope.group = data;
        }, function error(data) {
            console.log(data);
        });
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
        console.log('in NewEventCtrl');
        $scope.createEvent = function() {
            Event.save($scope.event, function success(data) {
                $location.path('/');
            }, function error(data) {
                Alerts.add('danger', 'You must be logged in to add')
                console.log(data);
            });
        };
    }])
    .controller('EventShowCtrl', ['$scope', '$stateParams', 'Event', function($scope, $stateParams, Event) {
        $scope.event = {};

        Event.get({ id: $stateParams.id }, function success(data) {
            $scope.event = data;
        }, function error(data) {
            console.log(data);
        });
    }]);
