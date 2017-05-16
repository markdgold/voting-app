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
                templateUrl: 'app/views/items.html',
                controller: 'HomeCtrl'
            })
            .state('newItem', {
                url: '/items/new',
                templateUrl: 'app/views/newItem.html',
                controller: 'NewCtrl'
            })
            .state('itemShow', {
                url: '/items/:id',
                templateUrl: 'app/views/showItem.html',
                controller: 'ShowCtrl'
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
