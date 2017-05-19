var app = angular.module('MyApp', ['ui.router', 'ui.bootstrap', 'MainCtrls']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/404');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/views/groups.html',
                // controller: 'GroupCtrl'
            })
            .state('newGroup', {
                url: '/group/new',
                templateUrl: 'app/views/newGroup.html',
                controller: 'NewGroupCtrl'
            })
            .state('groupShow', {
                url: '/group/:id',
                templateUrl: 'app/views/groupShow.html'
                    //,controller: 'GroupShowCtrl'
            })
            .state('editUsers', {
                url: '/editUsers',
                templateUrl: 'app/views/editUsers.html'
            })
            .state('newEvent', {
                url: '/event/new',
                templateUrl: 'app/views/newEvent.html',
                controller: 'NewEventCtrl'
            })
            .state('votes', {
                url: '/votes',
                templateUrl: 'app/views/votes.html'
                    //, controller: UserVotesCtrl
            })
            .state('voteShow', {
                url: '/vote/:id',
                templateUrl: 'app/views/voteShow.html',
                //, controller: VoteShowCtrl
            })
            .state('eventShow', {
                url: '/event/:id',
                templateUrl: 'app/views/eventShow.html'
                    // ,                controller: 'EventShowCtrl'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'app/views/userSignup.html',
                controller: 'SignupCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'app/views/userLogin.html',
                controller: 'LoginCtrl'
            })
            .state('profile', {
                url: '/profile',
                templateUrl: 'app/views/profile.html'
                    //, controller: ProfileCtrl
            })
            .state('404', {
                url: '/404',
                templateUrl: 'app/views/404.html'
            });

        $locationProvider.html5Mode(true);
    }
])

.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
}])
