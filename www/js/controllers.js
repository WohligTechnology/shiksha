angular.module('starter.controllers', ['starter.services',"chart.js"])


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

.controller('LoginCtrl', function($scope, $stateParams,$ionicPopup,$state,MyServices,$ionicModal) {
  $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'oops!',
      template: 'Sorry You have entered wrong username & password '

    });

    alertPopup.then(function(res) {
      // $state.go('app.task');
    });
  };
   $scope.login = function (formData) {
      MyServices.login(formData,function(data) {
          console.log("login",data);
          if(data.value){
            $scope.filter=data.data;
            //  $scope.loginAccess();
            $state.go('app.home');
          }else{
            $scope.showAlert();
          }

      });
};
  $ionicModal.fromTemplateUrl('templates/modal/loginfilter.html', {
    scope: $scope,
    // animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.Access = modal;
  });
  $scope.loginAccess = function() {
    $scope.Access.show();
  };
  $scope.closeAccess= function() {
    $scope.Access.hide();
  };

})

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

.controller('HomeCtrl', function($scope, $stateParams ,MyServices  ,$filter, $timeout,$ionicPopup,$state,$ionicTabsDelegate,$ionicPopover) {
  $scope.toasts = function (msg) {
    $scope.msg=msg;
    $scope.toast = $ionicPopup.show({
      templateUrl: 'templates/modal/toast.html',
      scope: $scope,
    });
    $timeout(function () {
    $scope.closePopuptoast();
  }, 5000);
  }

  $scope.selectedPab = "";
  $scope.selectedState = "";
  $scope.AllComponents = "";
  $scope.AllInstitutes = "";
  $scope.filteredComponents = {};
  $scope.filteredComponentsNew = {};
  $scope.totalUtilizedPercentage = 0;
  $scope.count = 0;
  var dropDownData = {
    pab: "",
    state: "",
    component: "",
    institute: ""
  };
  $scope.DashboardAllData = {};


  function loadData(dropDownData) {

    MyServices.getProjectReport(dropDownData,function(data) {
     console.log("project  ",data);
     $scope.filteredComponents = data.data;
     $scope.getProjectReport=data;

     //getTransactionReport api start

   MyServices.getTransactionReport(dropDownData,function(data) {
      $scope.filteredComponentsNew = data.data;
     console.log("project transaction  ",data);
     $scope.getTransactionReport=data;
     $scope.totalFundAllocation=$scope.getProjectReport.data.totalComponentsFundAllocation.totalFundAllocation;
     $scope.totalFundRelease1=$scope.getTransactionReport.data.totalReleaseAndUtilization.totalFundRelease1;
     $scope.totalUtilization1=$scope.getTransactionReport.data.totalReleaseAndUtilization.totalUtilization1;
     $scope.percent_utilized=  $filter('number')(($scope.totalUtilization1/$scope.totalFundRelease1)*100, 2);
     $scope.percent_Release=  $filter('number')(($scope.totalFundRelease1/$scope.totalFundAllocation)*100, 2);


     if($scope.percent_utilized &&  $scope.percent_Release){
     $scope.labels = [$scope.percent_utilized+"% Fund Utilization", $scope.percent_utilized+"% Fund Release", ""];
     $scope.data = [$scope.percent_utilized,  $scope.percent_Release, 15];
     }


        // console.log("filteredComponents", $scope.filteredComponents);
        // console.log("filteredComponentsNew", $scope.filteredComponentsNew);

        $scope.DashboardAllData = angular.extend({}, $scope.filteredComponents, $scope.filteredComponentsNew);
        console.log("DashboardAllData",$scope.DashboardAllData);

        // console.log("filteredComponentsNew", $scope.filteredComponentsNew);
        $scope.centerReleasePerComp = $scope.DashboardAllData.centerReleasePerComponent;
        $scope.stateReleasePerComp = $scope.DashboardAllData.stateReleasePerComponent;
        $scope.delayedProPerComp = $scope.DashboardAllData.totalDelayedProjectsPerComponent;
        // console.log($scope.centerReleasePerComp);
        // console.log($scope.stateReleasePerComp);
        // console.log($scope.delayedProPerComp);



        // to get totalDelayedProjectsPerComponent in institute array
        angular.forEach($scope.DashboardAllData.institute, function (inst, index) {
          if ($scope.delayedProPerComp != "No data founds") {
            //when we get 0 records from Db we canno't make any operation

            angular.forEach($scope.DashboardAllData.totalDelayedProjectsPerComponent, function (tdppc, index) {
              if (inst._id.componentId == tdppc._id.componentId) {
                inst.totalDelayedProjectsPerComponent = tdppc.totalDelayedProjectsPerComponent;
              } else {
                if (inst.totalDelayedProjectsPerComponent != null) {
                  console.log("inside totalDelayedProjectsPerComponent");
                } else {
                  // if it is null then make it 0 to display on table
                  inst.totalDelayedProjectsPerComponent = 0;
                }
              }
            });
          } else {
            // Don't compare it with 1st object put direct 0 in institute
            inst.totalDelayedProjectsPerComponent = null;
            inst.totalDelayedProjectsPerComponent = 0;
          }
        });

        // to get centerReleasePerComponent in institute array
        angular.forEach($scope.DashboardAllData.institute, function (inst, index) {

          if ($scope.centerReleasePerComp != "No data founds") {
            angular.forEach($scope.DashboardAllData.centerReleasePerComponent, function (crpc, index) {
              if (inst._id.componentId == crpc._id.componentId) {
                inst.centerReleasePerComponent = crpc.centerComponentRelease;
              } else {
                if (inst.centerReleasePerComponent != null) {
                  console.log("inside centerReleasePerComponent");
                } else {
                  inst.centerReleasePerComponent = 0;
                }
              }
            });
          } else {
            inst.centerReleasePerComponent = null;
            inst.centerReleasePerComponent = 0;
          }
        });


        // to get stateReleasePerComponent in institute array
        angular.forEach($scope.DashboardAllData.institute, function (inst, index) {

          if ($scope.stateReleasePerComp != "No data founds") {
            angular.forEach($scope.DashboardAllData.stateReleasePerComponent, function (srpc, index) {
              if (inst._id.componentId == srpc._id.componentId) {
                inst.stateReleasePerComponent = srpc.stateComponentRelease;
              } else {
                if (inst.stateReleasePerComponent != null) {
                  console.log("inside stateReleasePerComponent");
                } else {
                  inst.stateReleasePerComponent = 0;
                }
              }
            });
          } else {
            inst.stateReleasePerComponent = null;
            inst.stateReleasePerComponent = 0;
          }
        });


        // to get transactionsPerComponents in institute array
        angular.forEach($scope.DashboardAllData.institute, function (inst, index) {

          angular.forEach($scope.DashboardAllData.transactionsPerComponents, function (tpc, index) {


            if (inst._id.componentId == tpc._id.componentId) {
              inst.amountUtilizedPerComponent = tpc._id.amountUtilizedPerComponent;
              // inst.amountUtilizedPercentagePerComponent = tpc._id.amountUtilizedPercentagePerComponent;
              console.log("totalComponentRelease", tpc.totalComponentRelease);
              inst.amountUtilizedPercentagePerComponent = (tpc._id.amountUtilizedPerComponent * 100) / tpc.totalComponentRelease;
              console.log("count", $scope.count);
            } else {
              if (inst.amountUtilizedPerComponent != null && inst.amountUtilizedPercentagePerComponent != null) {
                console.log("inside transactionsPerComponents");
              } else {
                inst.amountUtilizedPerComponent = 0;
                inst.amountUtilizedPercentagePerComponent = 0;
                console.log("count inside", $scope.count);
              }
            }
          });
        });
         console.log("Updated object", $scope.DashboardAllData);
      });

    });


  }

  loadData(dropDownData);
   console.log("Updated object111", $scope.DashboardAllData);

  //
  // $scope.getAllDashboardData = function (item) {
  //   console.log(item);
  //   // var id = angular.element(event.target).data('id');
  //   // console.log(id);
  //
  //   if (id == "pab") {
  //     dropDownData.pab = item.pab._id;
  //     loadData(dropDownData);
  //   } else if (id == "state") {
  //     dropDownData.state = item._id;
  //     loadData(dropDownData);
  //   } else if (id == "component") {
  //     dropDownData.component = item._id;
  //     loadData(dropDownData);
  //   } else if (id == "institute") {
  //     dropDownData.institute = item._id;
  //     loadData(dropDownData);
  //   }
  //
  //   // console.log(dropDownData);
  // };


  $scope.closePopuptoast = function () {
      $scope.toast.close();
    }
//  MyServices.getProjectReport(null,function(data) {
//   console.log("project  ",data);
//   if(data){
//   $scope.getProjectReport=data;
//
//   //getTransactionReport api start
//
//    MyServices.getTransactionReport(null,function(data) {
//   console.log("project transaction  ",data);
//    if(data){
//   $scope.getTransactionReport=data;
//   $scope.totalFundAllocation=$scope.getProjectReport.data.totalComponentsFundAllocation.totalFundAllocation;
//   $scope.totalFundRelease1=$scope.getTransactionReport.data.totalReleaseAndUtilization.totalFundRelease1;
//   $scope.totalUtilization1=$scope.getTransactionReport.data.totalReleaseAndUtilization.totalUtilization1;
//   $scope.percent_utilized=  $filter('number')(($scope.totalUtilization1/$scope.totalFundRelease1)*100, 2);
//   $scope.percent_Release=  $filter('number')(($scope.totalFundRelease1/$scope.totalFundAllocation)*100, 2);
//
//
//   if($scope.percent_utilized &&  $scope.percent_Release){
//   $scope.labels = [$scope.percent_utilized+"% Fund Utilization", $scope.percent_utilized+"% Fund Release", ""];
//   $scope.data = [$scope.percent_utilized,  $scope.percent_Release, 15];
//   }
//   }
// });
//
//
// //getTransactionReport api end
//   }
//
// });


//filter api start
MyServices.findAllPab(function(data) {
 $scope.pab=data;
});
 MyServices.findAllState(function(data) {
   $scope.state=data;
});
 MyServices.findAllComponents(function(data) {
   $scope.components=data;
});
 MyServices.findAllInstituteDashBoard(function(data) {
   $scope.institute=data;
});
$scope.filterSubmit = function (formData) {
  console.log("filter");
  $scope.filterCriteria={};
  if(angular.isObject(formData.pab)){
   $scope.filterCriteria.pab= formData.pab._id;
  }
  if(angular.isObject(formData.state)){
  $scope.filterCriteria.state= formData.state._id;
  }
  if(angular.isObject(formData.institute)){
   $scope.filterCriteria.institute= formData.institute._id;
  }
  if(angular.isObject(formData.components)){
   $scope.filterCriteria.components= formData.components._id;
  }
  if(formData.status){
     $scope.filterCriteria.status= formData.status;
  }
  $scope.filter.close();
  loadData($scope.filterCriteria);
  //  MyServices.getProjectReport($scope.filterCriteria,function(data) {
  //      console.log("filtered data",data);
  //      if(data){
  //     $scope.filter.close();
  //      }
  //  });
};

//filter api end





  $scope.filters = function () {
if ($ionicTabsDelegate.selectedIndex() == 0){
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



  $scope.options = {
    segmentShowStroke: false
  };
  $scope.colors = ["#4b64ff", "#91a4af", "#d8dcde"];
  $scope.override = {
    borderColor: ['#4b64ff', '#91a4af', '#d8dcde']
  };



    $scope.card = {};
  $scope.cardopen = function(index, flag) {
    $scope.card[index] = flag;
  };

  $scope.showtab = true;
  // $scope.colors = ['#4b64ff', '#91a4af', '#d8dcde'];
  // $scope.override = {
  //   borderColor: ['#4b64ff', '#91a4af', '#d8dcde']
  // };



  $scope.options1 = {
    segmentShowStroke: false
  };
  $scope.colors0 = ["#003366", "#0099cc", "#ffffff"];
  $scope.override0 = {
    borderColor: ["#003366", "#0099cc", "#ffffff"]
  };
  $scope.colors1 = ["#6d5303", "#c3ad6a", "#ffffff"];
  $scope.override1 = {
    borderColor: ["#6d5303", "#c3ad6a", "#ffffff"]
  };
  $scope.colors2 = ["#525050", "#ada8a8", "#ffffff"];
  $scope.override2 = {
    borderColor:["#525050", "#ada8a8", "#ffffff"]
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
  console.log($stateParams.componentId)
  $scope.componentId=$stateParams.componentId
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
    $scope.componentId=$stateParams.componentId

  $scope.complete = {
    center: 30,
    state: 40,
    institute: 50
  };
})

.controller('MilestonesCtrl', function($scope, $stateParams,MyServices, $ionicModal) {
    console.log("$scope.componentId   "+$stateParams.componentId);
$scope.id=$stateParams.componentId;
 MyServices.getAllprojectOfComponent($scope.id,function(data) {
  $scope.getAllprojectOfComponent=data;
  console.log($scope.getAllprojectOfComponent);
});
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

.controller('ProjectPhotosCtrl', function($scope, $stateParams) {
      $scope.componentId=$stateParams.componentId

});
