angular.module('starter.controllers', ["chart.js"])


.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {})

.controller('PlaylistCtrl', function ($scope, $stateParams) {})

.controller('LoginCtrl', function ($scope, $stateParams) {})
.controller('SearchCtrl', function ($scope, $stateParams) {
})

.controller('HomeCtrl', function ($scope, $stateParams) {
  $scope.states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat'
  ];
  $scope.options = { segmentShowStroke : false };
  $scope.colors = ["#4b64ff", "#91a4af", "#d8dcde"];
  $scope.override = { borderColor: ['#4b64ff', '#91a4af','#d8dcde'] };
  $scope.labels = ["75% Fund Utilization", "", ""];
  $scope.data = [75, 20, 15];
})

.controller('StateCtrl', function ($scope, $stateParams) {
  $scope.institution = [
    'Institue of Chemical Technology', 'Mahatma Phule Krishi Vidyapeeth', 'Shivaji University', 'Solapur University', 'Tata Institue of Social Sciences', 'Tilal Maharastra University', 'University of Mumbai', 'Savitribai Phule Pune University'
  ];
  $scope.colors = ["#4b64ff", "#91a4af", "#d8dcde"];
    $scope.override = { borderColor: ['#4b64ff', '#91a4af','#d8dcde'] };
  $scope.labels = ["75% Fund Utilization", "", ""];
  $scope.data = [75, 20, 15];
})

.controller('InstituteCtrl', function ($scope, $stateParams) {
  // $scope.card = false;
  $scope.card = {};
  $scope.cardopen = function (index,flag) {
    console.log("hi");
    $scope.card[index] = flag;
    console.log($scope.card);
  };

  $scope.showtab = true;
  $scope.colors = ["#4b64ff", "#91a4af", "#d8dcde"];
    $scope.override = { borderColor: ['#4b64ff', '#91a4af','#d8dcde'] };
  $scope.labels = ["75% Fund Utilization", "", ""];
  $scope.data = [75, 20, 15];


  $scope.colors1 = ["#55c45f", "#d8dcde"];
   $scope.override1 = { borderColor: ['#55c45f', '#d8dcde'] };
  $scope.labels1 = ["40%", ""];
  $scope.data1 = [50, 50];

  $scope.colors2 = ["#55c45f", "#d8dcde"];
     $scope.override2 = { borderColor: ['#55c45f', '#d8dcde'] };
  $scope.labels2 = ["40%", ""];
  $scope.data2 = [50, 50];

  $scope.colors3 = ["#55c45f", "#d8dcde"];
     $scope.override3 = { borderColor: ['#55c45f', '#d8dcde'] };
  $scope.labels3 = ["40%", ""];
  $scope.data3 = [50, 50];
      $scope.funds = {
    utilized: 50,
    received: 40,
  };
  $scope.fundInstitutes=[{
    pab:'PAB8',
    utilized: '50',
    received: '40',
    status:'Active',
    grant:'75,00,000',
name:'Sports facilities',
    classcommerce:'ecommerce-green',
fundRecieved:' 40,00,000',

  },{
    pab:'PAB7',
    utilized: '50',
    received: '40',
    status:'Active',
    grant:'75,00,000',
        classcommerce:'ecommerce-green',
name:'Sports facilities',
fundRecieved:' 40,00,000',
  },{
    pab:'PAB7',
    utilized: '50',
    received: '40',
    status:'Completed',
    date:'15.06.2016',
    classStatus:'stable',
    classcommerce:'ecommerce-orange',
    grant:'45,00,000',
name:'Contruction of boys hostel',
fundRecieved:' 40,00,000',
  },
  ];
})

.controller('ProjectCtrl', function ($scope, $stateParams) {
  $scope.colors = ["#55c45f", "#d8dcde"];
     $scope.override = { borderColor: ['#55c45f', '#d8dcde'] };
  $scope.labels = ["40% Work Completed", ""];
  $scope.data = [40, 60];
    $scope.funds = {
    allocated: 100,
    received: 60,
    value: 30
  };
})

.controller('FundFlowCtrl', function ($scope, $stateParams) {
  $scope.complete = {
    center: 30,
    state: 40,
    institute: 50
  };
})

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
  $scope.complete = {
    value: 40
  };
  $scope.user = {
    min: 0,
    max: 100,
    value: 0
  }
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

.controller('UtilizationCtrl', function ($scope, $stateParams, $ionicModal) {
  $ionicModal.fromTemplateUrl('templates/modal/fund-utilization-add.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modaladd = modal;
  });
  $scope.openUtilizationAdd = function () {
    $scope.modaladd.show();
  };
  $scope.closeUtilizationAdd = function () {
    $scope.modaladd.hide();
  };

  $ionicModal.fromTemplateUrl('templates/modal/fund-utilization-edit.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modaledit = modal;
  });
  $scope.openUtilizationEdit = function () {
    $scope.modaledit.show();
  };
  $scope.closeUtilizationEdit = function () {
    $scope.modaledit.hide();
  };
  $scope.complete = {
    value: 50
  };
})

.controller('ProjectPhotosCtrl', function ($scope, $stateParams) {});