// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'highcharts-ng'])

    .run(function ($ionicPlatform, $ionicPopup) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
            if (window.cordova) {
                if (cordova.platformId == 'android') {
                    StatusBar.backgroundColorByHexString("#5418ff");
                }
            }
        });
        if (window.Connection) {
            if (navigator.connection.type == Connection.NONE) {
                $ionicPopup.confirm({
                        title: "Internet Disconnected",
                        content: "The internet is disconnected on your device."
                    })
                    .then(function (result) {
                        if (!result) {
                            ionic.Platform.exitApp();
                        }
                    });
            }
        }

    })

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $ionicConfigProvider.views.maxCache(2);

        $stateProvider
            .state('app', {
                cache: false,
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })
            .state('app.home', {
                cache: false,
                url: '/home',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/home.html',
                        controller: 'HomeCtrl'
                    }
                }
            })
            .state('app.search', {
                cache: false,
                url: '/search',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/search.html',
                        controller: 'SearchCtrl'
                    }
                }
            })
            .state('app.photogallery', {
                cache: false,
                url: '/photogallery/:componentId/:projectId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/photogallery.html',
                        controller: 'PhotoGalleryCtrl'
                    }
                }

            })
            .state('app.vendorlist', {
                cache: false,
                url: '/vendorlist',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/vendorlist.html',
                        controller: 'VendorListCtrl'
                    }
                }

            })
            .state('login', {
                cache: false,
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })
            .state('app.state', {
                cache: false,
                url: '/state',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/state.html',
                        controller: 'StateCtrl'
                    }
                }
            })
            .state('app.institute', {
                cache: false,
                url: '/institute',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/institute.html',
                        controller: 'InstituteCtrl'
                    }
                }
            })
            .state('app.overview', {
                cache: false,
                url: '/overview/:componentId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/overview.html',
                        controller: 'OverviewCtrl'
                    }
                }
            })
            .state('app.fundFlow', {
                cache: false,
                url: '/fund-flow/:componentId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/fund-flow.html',
                        controller: 'FundFlowCtrl'
                    }
                }
            })
            .state('app.milestones', {
                cache: false,
                url: '/milestones/:componentId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/milestones.html',
                        controller: 'MilestonesCtrl'
                    }
                }
            })
            .state('app.utilization', {
                cache: false,
                url: '/utilization',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/utilization.html',
                        controller: 'UtilizationCtrl'
                    }
                }
            })
            .state('app.projectPhotos', {
                cache: false,
                url: '/project-photos/:componentId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/project-photos.html',
                        controller: 'ProjectPhotosCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');
    })

    .directive('onlyDigits', function () {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attr, ctrl) {
                var digits;

                function inputValue(val) {
                    if (val) {
                        if (attr.type == "tel") {
                            digits = val.replace(/[^0-9\+\\]/g, '');
                        } else {
                            digits = val.replace(/[^0-9\-\\]/g, '');
                        }


                        if (digits !== val) {
                            ctrl.$setViewValue(digits);
                            ctrl.$render();
                        }
                        return parseInt(digits, 10);
                    }
                    return undefined;
                }
                ctrl.$parsers.push(inputValue);
            }
        };
    })
    .filter('uploadpath', function () {
        return function (input, width, height, style) {
            var other = "";
            if (width && width != "") {
                other += "&width=" + width;
            }
            if (height && height != "") {
                other += "&height=" + height;
            }
            if (style && style != "") {
                other += "&style=" + style;
            }
            if (input) {
                if (input.indexOf('https://') == -1) {
                    return imgpath + input + other;

                } else {
                    return input;
                }
            }
        };
    });
