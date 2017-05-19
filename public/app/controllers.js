angular.module('MainCtrls', ['MainServices'])
    .controller('GroupsCtrl', ['$scope', 'Group', function($scope, Group) {
        console.log('in GroupsCtrl');
        $scope.groups = [];
        //get all groups and delete a group. Probably don't need
        Group.query(function success(data) {
            console.log('success', data)
            $scope.groups = data;
        }, function error(data) {
            console.log('fail', data);
        });

        // $scope.deleteGroup = function(id, groupsIdx) {
        //     Group.delete({ id: id }, function success(data) {
        //         $scope.groups.splice(groupsIdx, 1);
        //     }, function error(data) {
        //         console.log(data);
        //     });
        // }
        //     Group.get({ id: "591e32fdb6846214d1a4625e" },
        //         function success(data) {
        //             console.log(data.userGroups);
        //         },
        //         function error(data) {
        //             console.log('error', data);
        //         });

    }])
    .controller('NewGroupCtrl', ['$scope', '$location', 'Group', 'Alerts', function($scope, $location, Group, Alerts) {
        console.log('in NewGroupCtrl');
        $scope.createGroup = function() {
            Group.save($scope.group, function success(data) {
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
                $location.path('/newVote');
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
        $scope.addToChoices = function() {
            console.log($scope.newChoice)
        }

    }])
    .controller('VoteShowCtrl', ['$scope', function($scope) {
        $scope.addToChoices = function() {
            console.log($scope.newChoice);
            var newChoice = document.createElement('span');
            newChoice.innerHTML = $scope.newChoice;
            var newRadio = document.createElement('input');
            newRadio.setAttribute('type', 'radio');
            newRadio.setAttribute('name', 'choice');
            document.getElementById('choices').appendChild(newRadio)
            document.getElementById('choices').appendChild(newChoice)

        }

    }]);
