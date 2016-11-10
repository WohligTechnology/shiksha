angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {})

.controller('PlaylistCtrl', function ($scope, $stateParams) {})

.controller('LoginCtrl', function ($scope, $stateParams) {})

.controller('HomeCtrl', function ($scope, $stateParams) {
  $scope.states=[
      'Andhra Pradesh','Arunachal Pradesh','Assam' ,'Bihar','Chhattisgarh','Goa','Gujarat'
    ];
})

.controller('StateCtrl', function ($scope, $stateParams) {
  $scope.institution=[
      'Institue of Chemical Technology','Mahatma Phule Krishi Vidyapeeth','Shivaji University' ,'Solapur University','Tata Institue of Social Sciences','Tilal Maharastra University','University of Mumbai','Savitribai Phule Pune University'
    ];
})

.controller('InstituteCtrl', function ($scope, $stateParams) {})

.controller('ProjectCtrl', function ($scope, $stateParams) {})

.controller('FundFlowCtrl', function ($scope, $stateParams) {})

.controller('MilestonesCtrl', function ($scope, $stateParams) {})

.controller('UtilizationCtrl', function ($scope, $stateParams) {})

.controller('ProjectPhotosCtrl', function ($scope, $stateParams) {});
