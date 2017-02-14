angular.module('starter.controllers', ["chart.js"])


.controller('AppCtrl', function($scope, $ionicModal, $timeout,$ionicPopup) {
  $scope.filters = function () {

    $scope.filter = $ionicPopup.show({
      templateUrl: 'templates/modal/projectfilter.html',
      scope: $scope,

    });
  }

  $scope.closePopup = function () {
      $scope.filter.close();
    }
})

.controller('PlaylistCtrl', function($scope, $stateParams) {})

.controller('LoginCtrl', function($scope, $stateParams) {})

.controller('SearchCtrl', function($scope, $stateParams) {})

.controller('PhotoGalleryCtrl', function($scope, $stateParams) {})

.controller('VendorListCtrl', function($scope, $stateParams, $ionicModal) {

  $ionicModal.fromTemplateUrl('templates/modal/vendordetail.html', {
    scope: $scope,
    // animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openVendor = function() {
    $scope.modal.show();
  };
  $scope.closeVendor= function() {
    $scope.modal.hide();
  };


$scope.contacts=[{
  img:'img/venkman.jpg',
  CompanyName:'Capgemini',
  ContactPersonName:'Venkman Nair',
   panno:'2344',
  mobile:'3930085096',
  email:'ruchira.wohlig@gmail.com'
},
{
img:'img/venkman.jpg',
  CompanyName:'Capgemini',
  ContactPersonName:'Venkman Nair',
  panno:'2344',
  mobile:'3930085096',
  email:'ruchira.wohlig@gmail.com'
}
]

// $scope.details=false;

// $scope.shows=function(index){
//   console.log(index);
//   $scope.details= !$scope.details;
// };

    $scope.details = -1;
   $scope.shows = function(index) {
       console.log(index);
       if ($scope.details !== index) {
           $scope.details = index;
       } else {
           $scope.details = -1;
       }
   };

})

.controller('HomeCtrl', function($scope, $stateParams ,$ionicPopup,$state,$ionicTabsDelegate,$ionicPopover) {


  $scope.filters = function () {
    if ($ionicTabsDelegate.selectedIndex() == 0){
// Perform some action
$scope.filter = $ionicPopup.show({
  templateUrl: 'templates/modal/projectfilter.html',
  cssClass: 'filter-pop',
  scope: $scope
});
}else{
  $scope.filter = $ionicPopup.show({
    templateUrl: 'templates/modal/projectinside.html',
    scope: $scope,
    cssClass: 'filter-pop'
  });
}
};


  $scope.closePopup = function () {
      $scope.filter.close();
    }
$scope.onsubmit =function(){
  $state.go('app.state');
    $scope.closePopup();

}

 $scope.institution = [
    'Institue of Chemical Technology', 'Mahatma Phule Krishi Vidyapeeth', 'Shivaji University', 'Solapur University', 'Tata Institue of Social Sciences', 'Tilal Maharastra University', 'University of Mumbai', 'Savitribai Phule Pune University'
  ];
  $scope.states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat'
  ];
    $scope.status = [
    'Active', 'On-Hold ', 'Completed'
  ];
  $scope.options = {
    segmentShowStroke: false
  };
  $scope.colors = ["#4b64ff", "#91a4af", "#d8dcde"];
  $scope.override = {
    borderColor: ['#4b64ff', '#91a4af', '#d8dcde']
  };
  $scope.labels = ["75% Fund Utilization", "", ""];
  $scope.data = [75, 20, 15];

    $scope.card = {};
  $scope.cardopen = function(index, flag) {
    console.log("hi");
    $scope.card[index] = flag;
    console.log($scope.card);
  };

  $scope.showtab = true;
  // $scope.colors = ['#4b64ff', '#91a4af', '#d8dcde'];
  // $scope.override = {
  //   borderColor: ['#4b64ff', '#91a4af', '#d8dcde']
  // };

  $scope.labels = ["75% Fund Utilization", "", ""];
  $scope.data = [75, 20, 15];

  $scope.options1 = {
    segmentShowStroke: false
  };
  // $scope.colors1 = ['#003366', '#f5f5f5', '#0099cb'];
  // $scope.override1 = {
  //   borderColor: ['#003366', '#f5f5f5', '#0099cb']
  // };
  $scope.labels1 = ["", "", ""];
  // $scope.data1 = [30, 55, 15];
  $scope.options = {
    segmentShowStroke: false
  };
  $scope.funds = {
    utilized: 50,
    received: 40,
  };
  $scope.fundInstitutes = [{
    pab: 'PAB 8',
    utilized: '50',
    received: '40',
    classStatus: 'bg-sky-blue',
    funddot: 'bg-sky-blue',
    status: 'Active',
    data1 : [30, 55, 15],
    grant: '75,00,000',
    colors1: ["#003366", "#0099cc", "#ffffff"],
    override1:{
    borderColor: ["#003366", "#0099cc", "#ffffff"]
  },
    dot1:'blue-dark',
    dot2:'blue-light',
    name: 'Sports facilities',
    classcommerce: 'ecommerce-green',
    fundRecieved: ' 40,00,000',

  }, {
    pab: 'PAB7',
    utilized: '50',
    received: '40',
    status: 'On-hold',
    classStatus: 'bg-yellow',
    grant: '75,00,000',
    data1 : [50, 35, 15],
    dot1:'yellow-dark',
    dot2:'yellow-light',
    colors1: ["#6d5303", "#c3ad6a", "#ffffff"],
    override1:{
    borderColor: ["#6d5303", "#c3ad6a", "#ffffff"]
  },
    funddot: 'bg-yellow',
    classcommerce: 'ecommerce-green',
    name: 'Sports facilities',
    fundRecieved: ' 40,00,000',
  }, {
    pab: 'PAB7',
    utilized: '50',
    received: '40',
    status: 'Completed',
    date: '15.06.2016',
    classStatus: 'bg-greylight',
    funddot: 'bg-greylight',
    data1 : [40, 45, 15],
    dot1:'grey-dark',
    dot2:'grey-light',
    colors1: ["#525050", "#ada8a8", "#ffffff"],
    override1:{
    borderColor: ["#525050", "#ada8a8", "#ffffff"]
  },
    classcommerce: 'ecommerce-orange',
    grant: '45,00,000',
    name: 'Contruction of boys hostel',
    fundRecieved: ' 40,00,000',
  } ];
})

.controller('StateCtrl', function($scope, $stateParams) {
  $scope.institution = [
    'Institue of Chemical Technology', 'Mahatma Phule Krishi Vidyapeeth', 'Shivaji University', 'Solapur University', 'Tata Institue of Social Sciences', 'Tilal Maharastra University', 'University of Mumbai', 'Savitribai Phule Pune University'
  ];
  $scope.colors = ["#4b64ff", "#91a4af", "#d8dcde"];
  $scope.override = {
    borderColor: ['#4b64ff', '#91a4af', '#d8dcde']
  };
  $scope.labels = ["75% Fund Utilization", "", ""];
  $scope.data = [75, 20, 15];
})

.controller('InstituteCtrl', function($scope, $stateParams) {

  $scope.card = {};
  $scope.cardopen = function(index, flag) {
    console.log("hi");
    $scope.card[index] = flag;
    console.log($scope.card);
  };

  $scope.showtab = true;
  $scope.colors = ['#4b64ff', '#91a4af', '#d8dcde'];
  $scope.override = {
    borderColor: ['#4b64ff', '#91a4af', '#d8dcde']
  };

  $scope.labels = ["75% Fund Utilization", "", ""];
  $scope.data = [75, 20, 15];

  $scope.options1 = {
    segmentShowStroke: false
  };
  $scope.colors1 = ['#003366', '#f5f5f5', '#0099cb'];
  $scope.override1 = {
    borderColor: ['#003366', '#f5f5f5', '#0099cb']
  };
  $scope.labels1 = ["", "", ""];
  $scope.data1 = [30, 55, 15];
  $scope.options = {
    segmentShowStroke: false
  };
  $scope.funds = {
    utilized: 50,
    received: 40,
  };
  $scope.fundInstitutes = [{
    pab: 'PAB 8',
    utilized: '50',
    received: '40',
    classStatus: 'bg-sky-blue',
    status: 'Active',
    grant: '75,00,000',
    name: 'Sports facilities',
    classcommerce: 'ecommerce-green',
    fundRecieved: ' 40,00,000',

  }, {
    pab: 'PAB7',
    utilized: '50',
    received: '40',
    status: 'On-hold',
    classStatus: 'bg-yellow',
    grant: '75,00,000',
    classcommerce: 'ecommerce-green',
    name: 'Sports facilities',
    fundRecieved: ' 40,00,000',
  }, {
    pab: 'PAB7',
    utilized: '50',
    received: '40',
    status: 'Completed',
    date: '15.06.2016',
    classStatus: 'bg-greylight',
    classcommerce: 'ecommerce-orange',
    grant: '45,00,000',
    name: 'Contruction of boys hostel',
    fundRecieved: ' 40,00,000',
  }, ];
})

.controller('ProjectCtrl', function($scope, $stateParams) {
  $scope.colors = ["#88c057", "#d8dcde"];
  $scope.override = {
    borderColor: ['#88c057', '#d8dcde']
  };
  $scope.labels = ["40% Work Completed", ""];
  $scope.data = [40, 60];
  $scope.funds = {
    allocated: 100,
    received: 60,
    value: 30
  };
})

.controller('FundFlowCtrl', function($scope, $stateParams) {
  $scope.complete = {
    center: 30,
    state: 40,
    institute: 50
  };
})

.controller('MilestonesCtrl', function($scope, $stateParams, $ionicModal) {
  $ionicModal.fromTemplateUrl('templates/modal/comment.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.comment = modal;
  });
  $scope.openComment = function() {
    $scope.comment.show();
  };
  $scope.closeComment = function() {
    $scope.comment.hide();
  };
  $ionicModal.fromTemplateUrl('templates/modal/transaction.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.transaction = modal;
  });
  $scope.opentransaction = function() {
    $scope.transaction.show();
  };
  $scope.closetransaction = function() {
    $scope.transaction.hide();
  };
$scope.priceSlider = 150;
  $scope.showPayment = function () {
      $scope.payment=true;
    }
  $scope.hidePayment = function () {
    $scope.payment=false;
    }

  $ionicModal.fromTemplateUrl('templates/modal/milestone-add.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modaladd = modal;
  });
  $scope.openMilestoneAdd = function() {
    $scope.modaladd.show();
  };
  $scope.closeMilestoneAdd = function() {
    $scope.modaladd.hide();
  };
  $scope.complete = {
    value: 40
  };
  $scope.user = {
    min: 0,
    max: 100,
    value: 0
  };

  $ionicModal.fromTemplateUrl('templates/modal/milestone-edit.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modaledit = modal;
  });
  $scope.openMilestoneEdit = function() {
    $scope.modaledit.show();
  };
  $scope.closeMilestoneEdit = function() {
    $scope.modaledit.hide();
  };
    $ionicModal.fromTemplateUrl('templates/modal/payment-edit.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalpayment = modal;
  });
  $scope.openPaymentEdit = function() {
    $scope.modalpayment.show();
  };
  $scope.closePaymentEdit = function() {
    $scope.modalpayment.hide();
  };
    $ionicModal.fromTemplateUrl('templates/modal/utilization-detail.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalutil = modal;
  });
  $scope.openUtilizationEdit = function() {
    $scope.modalutil.show();
  };
  $scope.closeUtilizationEdit = function() {
    $scope.modalutil.hide();
  };
    $ionicModal.fromTemplateUrl('templates/modal/createproject.html', {
    scope: $scope,
    // animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.createproject = modal;
  });
  $scope.openCreate = function() {
    $scope.createproject.show();
  };
  $scope.closeCreate= function() {
    $scope.createproject.hide();
  };
})

.controller('UtilizationCtrl', function($scope, $stateParams, $ionicModal) {
  $ionicModal.fromTemplateUrl('templates/modal/fund-utilization-add.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modaladd = modal;
  });
  $scope.openUtilizationAdd = function() {
    $scope.modaladd.show();
  };
  $scope.closeUtilizationAdd = function() {
    $scope.modaladd.hide();
  };

  $ionicModal.fromTemplateUrl('templates/modal/fund-utilization-edit.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modaledit = modal;
  });
  $scope.openUtilizationEdit = function() {
    $scope.modaledit.show();
  };
  $scope.closeUtilizationEdit = function() {
    $scope.modaledit.hide();
  };
  $scope.complete = {
    value: 50
  };
  $ionicModal.fromTemplateUrl('templates/modal/comment.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openComment = function() {
    $scope.modal.show();
  };
  $scope.closeComment = function() {
    $scope.modal.hide();
  };


  $ionicModal.fromTemplateUrl('templates/modal/utilization-detail.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modaladd = modal;
  });
  $scope.openUtilizationEdit = function() {
    $scope.modaladd.show();
  };
  $scope.closeUtilizationEdit = function() {
    $scope.modaladd.hide();
  };
})

.controller('ProjectPhotosCtrl', function($scope, $stateParams) {});
