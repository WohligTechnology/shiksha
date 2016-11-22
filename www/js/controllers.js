angular.module('starter.controllers', ["chart.js"])


.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {})

.controller('PlaylistCtrl', function ($scope, $stateParams) {})

.controller('LoginCtrl', function ($scope, $stateParams) {})

.controller('HomeCtrl', function ($scope, $stateParams) {
  $scope.states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat'
  ];
  $scope.colors = ["#4b64ff", "#91a4af", "#d8dcde"];
  $scope.labels = ["75% Fund Utilization", "", ""];
  $scope.data = [75, 20, 15];
})

.controller('StateCtrl', function ($scope, $stateParams) {
  $scope.institution = [
    'Institue of Chemical Technology', 'Mahatma Phule Krishi Vidyapeeth', 'Shivaji University', 'Solapur University', 'Tata Institue of Social Sciences', 'Tilal Maharastra University', 'University of Mumbai', 'Savitribai Phule Pune University'
  ];
  $scope.colors = ["#4b64ff", "#91a4af", "#d8dcde"];
  $scope.labels = ["75% Fund Utilization", "", ""];
  $scope.data = [75, 20, 15];
})

.controller('InstituteCtrl', function ($scope, $stateParams) {
  $scope.card = false;
  $scope.cardopen = function (index) {
    console.log("hi");
    $scope.card = !$scope.card;
  };

  $scope.showtab = true;
  $scope.colors = ["#4b64ff", "#91a4af", "#d8dcde"];
  $scope.labels = ["75% Fund Utilization", "", ""];
  $scope.data = [75, 20, 15];


  $scope.colors1 = ["#88c057", "#d8dcde"];
  $scope.labels1 = ["40%", ""];
  $scope.data1 = [50, 50];

  $scope.colors2 = ["#88c057", "#d8dcde"];
  $scope.labels2 = ["40%", ""];
  $scope.data2 = [50, 50];

  $scope.colors3 = ["#88c057", "#d8dcde"];
  $scope.labels3 = ["40%", ""];
  $scope.data3 = [50, 50];
})

.controller('ProjectCtrl', function ($scope, $stateParams) {
  $scope.colors = ["#88c057", "#d8dcde"];
  $scope.labels = ["40% Work Completed", ""];
  $scope.data = [40, 60];
})

.controller('FundFlowCtrl', function ($scope, $stateParams) {})

.controller('MilestonesCtrl', function ($scope, $stateParams, $ionicModal) {
  $ionicModal.fromTemplateUrl('templates/modal/comment.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.openComment = function () {
    $scope.modal.show();
  };
  $scope.closeComment = function () {
    $scope.modal.hide();
  };

  $ionicModal.fromTemplateUrl('templates/modal/milestone-add.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modaladd = modal;
  });
  $scope.openMilestoneAdd = function () {
    $scope.modaladd.show();
  };
  $scope.closeMilestoneAdd = function () {
    $scope.modaladd.hide();
  };

  $ionicModal.fromTemplateUrl('templates/modal/milestone-edit.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modaledit = modal;
  });
  $scope.openMilestoneEdit = function () {
    $scope.modaledit.show();
  };
  $scope.closeMilestoneEdit = function () {
    $scope.modaledit.hide();
  };
})

.controller('UtilizationCtrl', function ($scope, $stateParams) {})

.controller('ProjectPhotosCtrl', function ($scope, $stateParams) {});