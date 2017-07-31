angular.module('starter.controllers', ['starter.services', 'ngCordova', 'highcharts-ng', "chart.js", "cleave.js"])

    .controller('AppCtrl', function ($scope, $ionicModal, $ionicSideMenuDelegate, MyServices, $timeout, $ionicPopup, $state) {
        $scope.filters = function () {
            $scope.filter = $ionicPopup.show({
                templateUrl: 'templates/modal/projectfilter.html',
                scope: $scope,
            });
        }
        $scope.closePopup = function () {
            $scope.filter.close();
        }
        $scope.logout = function () {
            $.jStorage.set('filter', null);
            $.jStorage.deleteKey('filter');
            $.jStorage.flush();
            $state.go('login');
        }
        $scope.loginData = {};
        if ($.jStorage.get('user')) {
            $scope.profile = {};
            $scope.profile._id = $.jStorage.get('user')._id;
        }

        $scope.$watch(function () {
                return $ionicSideMenuDelegate.isOpenLeft();
            },
            function (isOpen) {
                if (isOpen) {
                    console.log("open");
                    MyServices.getProfile($scope.profile, function (data) {
                        console.log(data);
                        if (data.value) {
                            $scope.profile = data.data;
                        } else {

                        }
                    });
                } else {
                    console.log("close");
                }
            });
    })

    .controller('LoginCtrl', function ($scope, $stateParams, $ionicPopup, $state, MyServices, $ionicModal) {
        if ($.jStorage.get('filter') != null) {
            $state.go('app.home');
        }
        $scope.showAlert = function () {
            var alertPopup = $ionicPopup.alert({
                title: 'oops!',
                template: 'Sorry You have entered wrong username & password '

            });

            alertPopup.then(function (res) {
                // $state.go('app.task');
            });
        };
        $scope.login = function (formData) {
            MyServices.login(formData, function (data) {
                console.log("login", data);
                if (data.value) {
                    $scope.filter = data.data;
                    $.jStorage.set('user', data.data.userDetail);
                    $scope.loginAccess();
                    // $state.go('app.home');
                } else {
                    $scope.showAlert();
                }
            });
        };
        $scope.filterLogin = function (filter, type) {
            console.log(filter);
            $scope.filter = filter;
            $scope.filter.Access = type;
            $.jStorage.set('filter', $scope.filter);
            $scope.closeAccess();
            $state.go('app.home');
        };

        $ionicModal.fromTemplateUrl('templates/modal/loginfilter.html', {
            scope: $scope,
            // animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.Access = modal;
        });
        $scope.loginAccess = function () {
            $scope.Access.show();
        };
        $scope.closeAccess = function () {
            $scope.Access.hide();
        };
    })

    .controller('VendorListCtrl', function ($scope, $ionicPopup, $stateParams, MyServices, $ionicModal) {
        $scope.formData = {};
        // $scope.formData.type = "Institute";
        $scope.formData.type = $.jStorage.get('filter').Access;
        $scope.formData.type_id = $.jStorage.get('filter')._id;
        $scope.getAllVendor = function (formData) {

            MyServices.getAllVendorList($scope.formData, function (data) {
                if (data.value) {
                    $scope.vendorlist = data.data.vendor;
                }
            });
            $scope.$broadcast('scroll.refreshComplete');

        }
        $scope.findAllVendor = function () {

            MyServices.findAllVendor({}, function (data) {
                if (data.value) {
                    $scope.Allvendorlist = data.data.results;
                }
            });
            $scope.$broadcast('scroll.refreshComplete');

        }
        $scope.formData1 = {};
        $scope.vendorData = {};
        $scope.show = 0;
        $scope.findAllVendor();
        $scope.getAllVendor($scope.formData);
        $scope.showhistory = function (tab) {
            console.log(tab);
            $scope.show = tab;
        }
        $scope.searchVendor = function (vendorData) {
            if (vendorData.panOrTintan.length == 10) {
                console.log(vendorData);
                MyServices.searchVendor(vendorData, function (data) {
                    $scope.Allvendorlist = data.data;
                });
            } else if (vendorData.panOrTintan.length > 0 && vendorData.panOrTintan.length != 10) {
                // no need to search
            } else {
                $scope.findAllVendor();
            }
        }


        $scope.addVendorsubmit = function (formData) {
            $scope.formData1 = formData;
            // $scope.formData1.added_by = $.jStorage.get('filter').Access;
            // $scope.formData1.added_by_id = $.jStorage.get('filter')._id;
            MyServices.addVendorToGlobalList($scope.formData1, function (data) {
                if (data.value) {
                    $scope.formData1 = {};
                    $scope.closeVendor();
                    $scope.getAllVendor($scope.formData);
                } else {
                    $ionicPopup.alert({
                        title: 'Error',
                        template: data.error
                    });
                }
            });
        };
        $scope.addVendorToList = function (id) {
            $scope.vendor = {};
            $scope.vendor.vendor = id;
            $scope.vendor.added_by = $.jStorage.get('filter').Access;
            $scope.vendor.added_by_id = $.jStorage.get('filter')._id;
            MyServices.addVendorToList($scope.vendor, function (data) {
                if (data.value) {
                    $scope.formData1 = {};
                    $scope.getAllVendor($scope.formData);
                } else {
                    $ionicPopup.alert({
                        title: 'Message',
                        template: data.error
                    });
                }
            });
        };

        $ionicModal.fromTemplateUrl('templates/modal/vendordetail.html', {
            scope: $scope,
            // animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });
        $scope.openVendor = function () {
            $scope.modal.show();
        };
        $scope.closeVendor = function () {
            $scope.modal.hide();
        };

        $scope.contacts = [{
            img: 'img/venkman.jpg',
            CompanyName: 'Capgemini',
            ContactPersonName: 'Venkman Nair',
            panno: '2344',
            mobile: '3930085096',
            email: 'ruchira.wohlig@gmail.com'
        }, {
            img: 'img/venkman.jpg',
            CompanyName: 'Capgemini',
            ContactPersonName: 'Venkman Nair',
            panno: '2344',
            mobile: '3930085096',
            email: 'ruchira.wohlig@gmail.com'
        }]

        $scope.details = -1;
        $scope.shows = function (index) {
            // console.log(index);
            if ($scope.details !== index) {
                $scope.details = index;
            } else {
                $scope.details = -1;
            }
        };
        $scope.vendordetail = -1;
        $scope.vendorShows = function (index) {
            // console.log(index);
            if ($scope.vendordetail !== index) {
                $scope.vendordetail = index;
            } else {
                $scope.vendordetail = -1;
            }
        };

    })

    .controller('HomeCtrl', function ($scope, $stateParams, $rootScope, MyServices, $filter, $timeout, $ionicPopup, $state, $ionicTabsDelegate, $ionicPopover) {
        $rootScope.overviewChart = {};
        $scope.temp = 0;
        $scope.items = 0;
        $rootScope.percent_utilized = null;
        $rootScope.percent_Release = null;
        $scope.overviewChartshow = false;
        $scope.componentData = [];
        $scope.toasts = function (msg) {
            $scope.msg = msg;
            $scope.toast = $ionicPopup.show({
                templateUrl: 'templates/modal/toast.html',
                scope: $scope,
            });
            $timeout(function () {
                $scope.closePopuptoast();
            }, 5000);
        }
        console.log($.jStorage.get('filter'));
        $scope.acceslevel = $.jStorage.get('filter');
        $scope.addSeries = function () {
            var rnd = []
            for (var i = 0; i < 10; i++) {
                rnd.push(Math.floor(Math.random() * 20) + 1)
            }
            $scope.pieChart.series.push({
                data: rnd
            })
        }
        $scope.pieChart = {
            chart: {
                type: 'solidgauge',
                marginTop: 50
            },

            title: {
                text: '',
                style: {
                    fontSize: '24px'
                }
            },
            tooltip: {
                borderWidth: 0,
                backgroundColor: 'none',
                shadow: false,
                style: {
                    fontSize: '16px'
                },
                pointFormat: '',
                // pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
                positioner: function (labelWidth) {
                    return {
                        x: 200 - labelWidth / 2,
                        y: 180
                    };
                }
            },

            pane: {
                startAngle: 0,
                endAngle: 360,
                background: [{ // Track for Move
                    outerRadius: '112%',
                    innerRadius: '88%',
                    backgroundColor: '#d8e9f9',
                    borderWidth: 0
                }, { // Track for Exercise
                    outerRadius: '87%',
                    innerRadius: '63%',
                    backgroundColor: '#c7c7c8',
                    borderWidth: 0
                }]
            },

            yAxis: {
                min: 0,
                max: 100,
                lineWidth: 0,
                tickPositions: []
            },

            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        enabled: false
                    },
                    linecap: 'round',
                    stickyTracking: false,
                    rounded: true
                }
            },

            series: [{
                name: 'Move',
                borderColor: '#7cb5ec',
                data: [{
                    color: '#003366',
                    radius: '112%',
                    innerRadius: '88%',
                    y: 0
                }]
            }, {
                name: 'Exercise',
                borderColor: '#434348',
                data: [{
                    color: '#00ff00',
                    radius: '87%',
                    innerRadius: '63%',
                    y: 0
                }]
            }]
        };

        // $scope.pieChart.series.data=[10,20];
        $scope.selectedPab = "";
        $scope.selectedState = "";
        $scope.AllComponents = "";
        $scope.AllInstitutes = "";
        $scope.filteredComponents = {};
        $scope.filteredComponentsNew = {};
        $scope.totalUtilizedPercentage = 0;
        $scope.count = 0;
        $scope.stopComponent = false;
        $scope.dropDownData = {

            pab: "",
            state: "",
            component: "",
            institute: "",
            page: 1
        };
        var filter = $.jStorage.get("filter");
        if (filter.Access == "State") {
            $scope.dropDownData.state = filter._id;
        }
        if (filter.Access == "Institute") {
            $scope.dropDownData.institute = filter._id;

        }
        $scope.DashboardAllData = {};

        $scope.initConfig = function (config, release, util, allocation) {
            if (util !== 0) {
                var util1 = _.round(util / release * 100, 2);
            } else {
                var util1 = 0;
            }
            if (release !== 0) {
                var release1 = _.round(release / allocation * 100, 2);
            } else {
                var release1 = 0;
            }
            console.log("my all values", release1, util1, allocation);
            $scope.config = _.cloneDeep(config);
            $scope.config.series[0].data[0].y = release1;
            $scope.config.series[1].data[0].y = util1;
        }
        $scope.overviewChartshow = false;

        // $scope.overviewChart = {};
        $scope.loadData = function () {
            $scope.compget = true;
            MyServices.getDashboardData($scope.dropDownData, function (data) {
                $scope.DashboardAllData = data.data;
                console.log($scope.DashboardAllData);

                if ($scope.DashboardAllData) {
                    $scope.percent_utilized = _.round(($scope.DashboardAllData.getFundUtilized[0].totalFundUtilized / $scope.DashboardAllData.getTotalFundReleased[0].totalFundReleased) * 100, 2);
                    $scope.percent_Release = _.round(($scope.DashboardAllData.getTotalFundReleased[0].totalFundReleased / $scope.DashboardAllData.getTotalFundAllocation[0].totalFundAllocation) * 100, 2);

                    $rootScope.overviewChart.series[0].data[0].y = 100;
                    $rootScope.overviewChart.series[1].data[0].y = $scope.percent_Release;
                    $rootScope.overviewChart.series[2].data[0].y = _.round(($scope.DashboardAllData.getFundUtilized[0].totalFundUtilized / $scope.DashboardAllData.getTotalFundAllocation[0].totalFundAllocation) * 100, 2);
                    console.log($scope.percent_utilized, $rootScope.overviewChart.series[2].data[0].y);
                    $scope.overviewChartshow = true;
                }


            });
            MyServices.componentData($scope.dropDownData, function (data) {

                if (data.value && $scope.compget) {
                    $scope.compData = data.data.compList;
                    console.log($scope.componentData);
                    $scope.compget = false;
                    $scope.componentData = _.concat($scope.compData, $scope.componentData);
                    if (data.data.compList.length == 0) {
                        $scope.stopComponent = true;
                    } else {
                        $scope.stopComponent = false;
                    }
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        }
        $scope.loadData();
        $scope.loadMore = function () {
            console.log("inside loadMore", $scope.dropDownData);
            $scope.dropDownData.page = $scope.dropDownData.page + 1;

            $scope.loadData();
            // $scope.$broadcast('scroll.infiniteScrollComplete');
        };
        console.log("Updated object111", $scope.DashboardAllData);
        $scope.closePopuptoast = function () {
            $scope.toast.close();
        }
        //filter api start
        MyServices.findAllPab(function (data) {
            $scope.pab = data;
        });
        MyServices.findAllState(function (data) {
            $scope.state = data;
        });
        MyServices.findAllComponents(function (data) {
            $scope.components = data;
        });
        console.log("state", $scope.acceslevel.Access);
        if ($scope.acceslevel.Access === 'State') {
            MyServices.findAllInstituteDashBoard($scope.acceslevel._id, function (data) {
                $scope.institute = data;
                console.log(data);
                // $scope.generateField = true;
            });
        }

        $scope.getins = function (state) {
            console.log("hi", state);
            $scope.state1 = state;
            MyServices.findAllInstituteDashBoard($scope.state1, function (data) {
                $scope.institute = data;
                // $scope.generateField = true;
            });
        }
        $scope.filterSubmit = function (formData) {
            $scope.dropDownData = {
                pab: "",
                state: "",
                component: "",
                institute: "",
                page: 0
            };
            $scope.dropDownData.page = 1;
            $scope.InstituePagination = null;
            $scope.componentData = [];
            $scope.DashboardAllData = {};

            console.log("filter", formData);
            $scope.filterCriteria = {};
            if (angular.isObject(formData.pab)) {
                $scope.dropDownData.pab = formData.pab._id;
            }
            if (angular.isObject(formData.state)) {
                $scope.dropDownData.state = formData.state._id;
            }
            if (angular.isObject(formData.institute)) {
                $scope.dropDownData.institute = formData.institute._id;
            }
            if (angular.isObject(formData.components)) {
                $scope.dropDownData.components = formData.components._id;
            }
            if (formData.status) {
                $scope.dropDownData.componentStatus = formData.status;
            }
            $scope.filter.close();
            console.log("filter", $scope.dropDownData);

            $scope.loadData();

        };
        //filter api end
        $scope.filters = function () {
            if ($ionicTabsDelegate.selectedIndex() == 0) {
                $scope.filter = $ionicPopup.show({
                    templateUrl: 'templates/modal/projectfilter.html',
                    cssClass: 'filter-pop',
                    scope: $scope
                });
            } else {
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



        $rootScope.overviewChart = {
            chart: {
                type: 'solidgauge',
                marginTop: 0
            },
            title: {
                text: '',
                style: {
                    fontSize: '24px'
                }
            },
            tooltip: {
                borderWidth: 0,
                backgroundColor: 'none',
                color: 'transparent',
                shadow: false,
                style: {
                    fontSize: '18px'
                },
                pointFormat: '',
                // pointFormat: '<p style="font-size:24px;color: {point.color}; font-weight: bold" >{series.name}</p><br><span style="font-size:24px; color: {point.color}; font-weight: bold">{point.y}%</span>',
                positioner: function (labelWidth) {
                    return {
                        x: 200 - labelWidth / 2,
                        y: 180
                    };
                }
            },

            pane: {
                startAngle: 0,
                endAngle: 360,
                background: [{ // Track for Move
                    outerRadius: '112%',
                    innerRadius: '88%',
                    // backgroundColor: '#d8e9f9',
                    backgroundColor: 'transparent',
                    borderWidth: 0
                }, { // Track for Exffffff
                    outerRadius: '87%',
                    innerRadius: '63%',
                    // backgroundColor: '#c7c7c8',
                    backgroundColor: 'transparent',
                    borderWidth: 0
                }, { // Track for Stand
                    outerRadius: '36%',
                    innerRadius: '60%',
                    // backgroundColor: '#defad8',
                    backgroundColor: 'transparent',
                    borderWidth: 0
                }]
            },

            yAxis: {
                min: 0,
                max: 100,
                lineWidth: 0,
                tickPositions: []
            },

            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        enabled: false
                    },
                    linecap: 'round',
                    stickyTracking: false,
                    rounded: true
                }
            },

            series: [{
                name: '',
                borderColor: '#7cb5ec',
                data: [{
                    color: '#7cb5ec',
                    radius: '112%',
                    innerRadius: '80%',
                    y: 100
                }]
            }, {
                name: '',
                borderColor: '#434348',
                data: [{
                    color: '#434348',
                    // radius: '87%',
                    // innerRadius: '63
                    radius: '107%',
                    innerRadius: '87%',
                    y: 0
                }]
            }, {
                name: '',
                borderColor: '#90ed7d',
                data: [{
                    color: '#90ed7d',
                    // radius: '62%',
                    // innerRadius: '38%',
                    radius: '102%',
                    innerRadius: '92%',
                    y: 0
                }]
            }]
        };


    })

    .controller('OverviewCtrl', function ($scope, $stateParams, MyServices, $ionicModal) {
        $ionicModal.fromTemplateUrl('templates/modal/callmodal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.callmodal = modal;
        });
        $scope.opencallmodal = function (details) {
            $scope.formData1 = details;
            $scope.callmodal.show();
        };
        $scope.closecallmodal = function () {
            $scope.callmodal.hide();
        };
        MyServices.componentFundflow($scope.componentId, function (data) {
            $scope.fundflow = data.data;
        });
        $scope.componentId = $stateParams.componentId;
        var dropDownData = {
            pab: "",
            state: "",
            component: "",
            institute: "",
            keyComponents: "",
            page: 1
        };
        dropDownData.component = $stateParams.componentId;

        MyServices.componentData(dropDownData, function (data) {
            $scope.overview = data.data.compList[0];
            console.log("***** inside componentData *****", $scope.overview);

            // $scope.pabName = $scope.overview.componentDetail._id.pabName.split('#')[1];
            $scope.labels = [$scope.overview.workCompleted + "% Work Completed", ""];
            $scope.data = [$scope.overview.workCompleted, 100 - $scope.overview.workCompleted];


        });

        $scope.colors = ["#88c057", "#d8dcde"];
        $scope.override = {
            borderColor: ['#88c057', '#d8dcde']
        };

    })

    .controller('FundFlowCtrl', function ($scope, $filter, $stateParams, MyServices, $ionicModal) {
        var dropDownData = {
            pab: "",
            state: "",
            component: "",
            institute: "",
            keyComponents: "",
            page: 1
        };
        MyServices.componentData(dropDownData, function (data) {
            $scope.overview = data.data.compList[0];
        });
        $scope.componentId = $stateParams.componentId;
        $scope.getRedDate = function (rDate) {
            $scope.rDate = new Date(rDate);
            var numberOfDaysToAdd = 30;
            $scope.newdate = $scope.rDate.setDate($scope.rDate.getDate() + numberOfDaysToAdd);
            if ($scope.newdate > new Date()) {
                return false;
            } else {
                return true;
            }
        };
        $ionicModal.fromTemplateUrl('templates/modal/callmodal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.callmodal = modal;
        });
        $scope.opencallmodal = function (details) {
            $scope.formData1 = details;
            $scope.callmodal.show();
        };
        $scope.closecallmodal = function () {
            $scope.callmodal.hide();
        };
        MyServices.componentFundflow($scope.componentId, function (data) {
            $scope.fundflow = data.data;
        });


        $ionicModal.fromTemplateUrl('templates/modal/remark.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.remarkModal = modal;
        });
        $scope.openRemark = function (remark) {
            console.log("**** openRemark ****", remark);
            $scope.remark = remark;
            // $scope.type = type;
            // $scope.installment = installment;
            $scope.remarkModal.show();
        };
        $scope.closeRemark = function () {
            $scope.remarkModal.hide();
        };
        var options = "location=no,toolbar=yes";
        var target = "_blank";
        var url = "";

        $scope.openPDF = function (link) {
            // url = $filter('serverimage')(link);
            $scope.pdfURL = $filter('uploadpath')(link);
            $scope.finalURL = 'http://docs.google.com/gview?url=' + $scope.pdfURL + '&embedded=true';
            var ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
        };

        $ionicModal.fromTemplateUrl('templates/modal/imageViewer.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.imageView = modal;
        });
        $scope.openImage = function (image) {
            $scope.image = image;
            $scope.imageView.show();
        };
        $scope.closeImage = function () {
            $scope.imageView.hide();
        };
        // $scope.complete = {
        //     center: 30,
        //     state: 40,
        //     institute: 50
        // };

    })

    .controller('ProjetctCtrl', function ($scope, $stateParams, $ionicPopup, $filter, MyServices, $rootScope, $ionicModal, $ionicActionSheet, $cordovaCamera, $ionicLoading, $cordovaFileTransfer, $cordovaImagePicker) {
        $scope.projectNotInProExpense = {};
        $scope.componentId = $stateParams.componentId;
        $scope.allocationData = {};
        $scope.workOrder = {};
        $scope.gettrans = {};
        $scope.transactionEdit = {};
        $rootScope.projectID = "";
        var dropDownData = {
            pab: "",
            state: "",
            component: "",
            institute: "",
            keyComponents: "",
            page: 1
        };

        $scope.options = {
            currency: {
                numeral: true,
                numeralThousandsGroupStyle: 'lakh'
            }
        };
        dropDownData.component = $stateParams.componentId;
        MyServices.componentData(dropDownData, function (data) {
            $scope.overview = data.data.compList[0];
        });
        var options = "location=no,toolbar=yes";
        var target = "_blank";
        var url = "";
        $scope.openPDF = function (link) {
            $scope.pdfURL = $filter('uploadpath')(link);
            $scope.finalURL = 'http://docs.google.com/gview?url=' + $scope.pdfURL + '&embedded=true';
            var ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
        };
        $scope.getProject = function () {
            MyServices.componentProjects($scope.componentId, function (data) {
                if (data.value && data.data != 'noDataFound') {
                    $scope.fundUtil = 0;
                    $scope.totalamt = 0;
                    $scope.componentProjects = data.data;
                    _.forEach($scope.componentProjects, function (value) {
                        $scope.fundUtil = $scope.fundUtil + value.totalAmountReleased;
                        $scope.totalamt = $scope.totalamt + value.totalValue;
                    });
                    console.log($scope.componentProjects);
                }
            });
        }
        $scope.getProject();

        MyServices.findAllProjectType(function (data) {
            $scope.findAllProjectType = data.data;
            console.log($scope.findAllProjectType);
        });
        MyServices.findAllAssetType(function (data) {
            $scope.findAllAssetType = data.data;
            console.log($scope.findAllAssetType);
        });

        $scope.formData = {};
        $scope.formData.type = $.jStorage.get('filter').Access;
        $scope.formData.type_id = $.jStorage.get('filter')._id;
        MyServices.getAllVendorList($scope.formData, function (data) {
            if (data.value) {
                $scope.vendorlist = data.data.vendor;
            }
        });

        $scope.viewData = {};
        $scope.viewAll = function (id) {
            $scope.viewData.projectId = id;
            $scope.viewData.componentId = $stateParams.componentId;
            MyServices.getProjectAllNotes($scope.viewData, function (data) {
                $scope.AllNotes = data.data.notes;
                $scope.openComment();
            });
        }
        $scope.addCopy = function (maxImage) {
            MyServices.showActionsheet(maxImage, function (Images) {
                $scope.allocationData.orderFile = [];
                _.forEach(Images, function (value) {
                    $scope.allocationData.orderFile.push(value);
                });
            });
        }

        $ionicModal.fromTemplateUrl('templates/modal/milestone-edit.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modaledit = modal;
        });
        $scope.closeMilestoneEdit = function () {
            $scope.modaledit.hide();
        };
        $ionicModal.fromTemplateUrl('templates/modal/payment-edit.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.paymentEditModal = modal;
        });
        $scope.closePaymentEdit = function () {
            $scope.paymentEditModal.hide();
        };

        $scope.openPaymentEdit = function (id, data, modalheader) {
            $scope.closeMilestoneEdit();
            console.log("id get", id);
            $scope.allocationData = data;
            $scope.modalheader = modalheader;
            $rootScope.projectID = id;
            if (data != null) {
                $scope.allocationData.orderIssueDate = new Date($scope.allocationData.orderIssueDate);
                $scope.allocationData.orderDueDate = new Date($scope.allocationData.orderDueDate);
            }
            $scope.paymentEditModal.show();
        };

        $scope.workOrderID = {};

        $scope.openMilestoneEdit = function (proEx, project, institute) {
            console.log("id get", project);
            var data = {};
            $scope.workOrder = {};
            $scope.gettrans = {};
            $scope.workOrderID._id = proEx._id;
            $scope.gettrans.vendorId = proEx.vendor._id;
            $scope.gettrans.projectId = project;
            $scope.workOrder = proEx;
            $scope.workOrder.institute = institute.institute;
            MyServices.getWorkOrderToEdit($scope.workOrderID, function (data) {
                if (data.value) {
                    $scope.singleWorkOrder = data.data[0];
                }
            });
            MyServices.getWorkOrderTransactions($scope.gettrans, function (data) {
                if (data.value) {
                    $scope.WorkOrderTransactions = data.data[0].transactions;
                    $scope.modaledit.show();
                    $scope.project = data.data;
                }
            });
        };

        $scope.addAllocation = function (formData) {
            console.log(formData);
            var allocationform = formData;
            allocationform.vendor = formData.vendor._id;
            if (formData.project != "") {
                allocationform.project = $rootScope.projectID;
            }
            var issueDate = new Date(allocationform.orderIssueDate);
            var dueDate = new Date(allocationform.orderDueDate);

            if (issueDate < dueDate) {
                MyServices.vendorAllocation(allocationform, function (data) {
                    if (data.value) {
                        // $scope.allocationData = {};
                        $scope.getProject();
                        MyServices.getWorkOrderToEdit($scope.workOrderID, function (data) {
                            if (data.value) {
                                $scope.singleWorkOrder = data.data[0];
                            }
                        });
                    }
                    $scope.closePaymentEdit();
                });
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: 'oops!',
                    template: 'Due date is must be greater than issue date '
                });
                alertPopup.then(function (res) {});
            }
        }

        $scope.commentData = {};
        $scope.commentNotes = function (id, comment) {
            $scope.commentData.projectId = id;
            $scope.commentData.text = comment;
            $scope.commentData.componentId = $stateParams.componentId;
            $scope.commentData.added_by = $.jStorage.get('filter')._id;
            $scope.commentData.from = $.jStorage.get('filter').name;
            MyServices.addProjectNotes($scope.commentData, function (data) {
                if (data.value) {
                    $scope.commentData = {};
                    $scope.comment.text = null;
                    console.log(data);
                }
                // $scope.openComment();
            });
        }
        $scope.project = {};
        $scope.project.components = $stateParams.componentId;
        $scope.createprojectFun = function (project) {
            $scope.project = project;
            $scope.project.components = $scope.componentId;
            MyServices.createProject($scope.project, function (data) {
                $scope.project = data.data;
                console.log($scope.project);
                if (data.value) {
                    $scope.getProject();
                    $scope.closeCreate();
                }
            });
        }
        $scope.EditprojectFun = function (project) {
            $scope.project = project;
            $scope.project.components = $scope.componentId;
            $scope.project._id = $rootScope.projectID;
            $scope.project.assetType = $scope.project.assetType._id;
            $scope.project.projectType = $scope.project.projectType._id;
            MyServices.updateProject($scope.project, function (data) {
                $scope.project = data.data;
                console.log($scope.project);
                if (data.value) {
                    $scope.getProject();
                    $scope.closeEdit();
                }
            });
        }

        $scope.photodata = {};
        $scope.photodata.componentId = $stateParams.componentId;
        $scope.photodata.projectId = $rootScope.id;
        MyServices.getProjectAllPhotos($scope.photodata, function (data) {
            if (data.value) {
                console.log(data);
                $scope.allPhotos = data.data.photos;
                $scope.allPhotos = _.chunk($scope.allPhotos, 3);
                console.log($scope.allPhotos);
            }
        });
        $scope.markascomplete = function () {
            $scope.mark = {};
            $scope.mark.projectId = $rootScope.id;
            $scope.mark.status = "Completed";
            // $scope.mark.status = "Active";
            MyServices.changeStatus($scope.mark, function (data) {
                if (data.value) {
                    console.log(data);
                    $scope.getProject();
                }
            });
        }
        $scope.addProjectImages = function () {
            MyServices.showActionsheet(20, function (Images) {
                console.log("hi", Images)
                $scope.dataPhoto = {};
                $scope.dataPhoto.photos = [];

                _.forEach(Images, function (value) {
                    $scope.dataPhoto.photos.push({
                        "photo": value
                    });
                });
                $scope.dataPhoto.componentId = $stateParams.componentId;
                $scope.dataPhoto.projectId = $rootScope.id;
                MyServices.addProjectPhotos($scope.dataPhoto, function (data) {
                    if (data.value) {
                        console.log(data);
                        $scope.photodata = {};
                        $scope.photodata.componentId = $stateParams.componentId;
                        $scope.photodata.projectId = $rootScope.id;
                        MyServices.getProjectAllPhotos($scope.photodata, function (data) {
                            if (data.value) {
                                console.log(data);
                                $scope.allPhotos1 = data.data.photos;
                                $scope.allPhotos1 = _.chunk($scope.allPhotos1, 3);
                                console.log($scope.allPhotos1);
                            }
                        });
                    }
                });
            });
        };

        $ionicModal.fromTemplateUrl('templates/modal/photos.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.photos = modal;
        });
        $scope.openPhotos = function (id) {
            console.log(id);
            $rootScope.id = id;
            $scope.photodata = {};
            $scope.allPhotos1 = null;
            $scope.photodata.componentId = $stateParams.componentId;
            $scope.photodata.projectId = $rootScope.id;
            MyServices.getProjectAllPhotos($scope.photodata, function (data) {
                if (data.value) {
                    console.log(data);
                    $scope.allPhotos1 = data.data.photos;
                    $scope.allPhotos1 = _.chunk($scope.allPhotos1, 3);
                    console.log($scope.allPhotos1);
                }
            });
            $scope.photos.show();
        };
        $scope.closePhotos = function () {
            $scope.photos.hide();
        };

        $ionicModal.fromTemplateUrl('templates/modal/comment.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.comment = modal;
        });
        $scope.openComment = function () {
            $scope.comment.show();
        };
        $scope.closeComment = function () {
            $scope.comment.hide();
        };

        $ionicModal.fromTemplateUrl('templates/modal/transaction.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.transaction = modal;
        });
        $scope.addInstallmentProof = function (maxImage) {
            MyServices.showActionsheet(maxImage, function (Images) {
                $scope.transactionData.file = "";
                $scope.transactionData.file = Images[0];

            });
        };
        $scope.opentransaction = function (id) {
            $scope.id = {};
            $scope.id = id;
            $scope.transactionData = {};
            $scope.allocationData = {};
            MyServices.getTransactions($scope.id, function (data) {
                if (data.value) {
                    $scope.transactionData = data.data;
                    $scope.transactionData.transactionSent = new Date($scope.transactionData.transactionSent);
                    $scope.transactionData.transactionReceived = new Date($scope.transactionData.transactionReceived);
                }
            });
            $scope.transaction.show();
        };
        $scope.closetransaction = function () {
            $scope.transaction.hide();
        };

        $scope.saveTransaction = function (transactionData, id) {
            console.log("transactionData", transactionData);
            $scope.transactionEdit = {};
            $scope.transactionEdit.installment = transactionData.installment;
            $scope.transactionEdit.transactionSent = transactionData.transactionSent;
            $scope.transactionEdit.transactionReceived = transactionData.transactionReceived;
            $scope.transactionEdit.amount = transactionData.amount;
            $scope.transactionEdit.remarks = transactionData.remarks;
            $scope.transactionEdit.file = transactionData.file;
            $scope.transactionEdit.projectExpenseId = $scope.workOrder._id;
            $scope.transactionEdit.vendorId = $scope.workOrder.vendor._id;
            $scope.transactionEdit.componentId = $stateParams.componentId;
            $scope.transactionEdit.instituteId = $scope.workOrder.institute;
            if (id) {
                $scope.transactionEdit._id = id;
                MyServices.vendorWorkOrderReleaseUpdate($scope.transactionEdit, function (data) {
                    if (data.value) {
                        $scope.closetransaction();
                        console.log(data.data);
                        MyServices.getWorkOrderTransactions($scope.gettrans, function (data) {
                            if (data.value) {
                                $scope.WorkOrderTransactions = data.data[0].transactions;
                                $scope.modaledit.show();
                                $scope.project = data.data;
                            }
                        });
                    }
                });
            } else {
                MyServices.vendorWorkOrderRelease($scope.transactionEdit, function (data) {
                    if (data.value) {
                        $scope.closetransaction();
                        console.log(data.data);
                        MyServices.getWorkOrderTransactions($scope.gettrans, function (data) {
                            if (data.value) {
                                $scope.WorkOrderTransactions = data.data[0].transactions;
                                $scope.modaledit.show();
                                $scope.project = data.data;
                            }
                        });
                    }
                });
            }
        };
        $scope.priceSlider = 150;
        $scope.payment = {};
        $scope.showPayment = function (index, flag) {
            console.log(index, flag);
            $scope.payment[index] = flag;
        }
        $scope.hidePayment = function () {
            $scope.payment = false;
        }


        $ionicModal.fromTemplateUrl('templates/modal/createproject.html', {
            scope: $scope,
            // animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.createproject = modal;
        });
        $scope.openCreate = function () {
            $scope.createproject.show();
        };
        $scope.closeCreate = function () {
            $scope.createproject.hide();
        };

        $ionicModal.fromTemplateUrl('templates/modal/utilization-detail.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalutil = modal;
        });
        $scope.openUtilizationEdit = function (id) {
            console.log("id", id)
            $rootScope.projectID = id;
            $scope.modalutil.show();
        };
        $scope.closeUtilizationEdit = function () {
            $scope.modalutil.hide();
        };

        $ionicModal.fromTemplateUrl('templates/modal/callmodal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.callmodal = modal;
        });
        $scope.opencallmodal = function (details) {
            $scope.formData1 = details;
            $scope.callmodal.show();
        };
        $scope.closecallmodal = function () {
            $scope.callmodal.hide();
        };

        $ionicModal.fromTemplateUrl('templates/modal/editproject.html', {
            scope: $scope,
            // animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.Editproject = modal;
        });
        $scope.openEdit = function () {
            $scope.show();
            MyServices.ProjectGetOne($rootScope.projectID, function (data) {
                $scope.show();
                if (data.value) {
                    $scope.hide();
                    $scope.project = data.data;
                    $scope.project.dueDate = new Date($scope.project.dueDate);
                }
            });
            $scope.Editproject.show();
        };
        $scope.closeEdit = function () {
            $scope.Editproject.hide();
        };

        $scope.show = function () {
            $ionicLoading.show({
                template: 'Loading...',
                duration: 3000
            }).then(function () {});
        };
        $scope.hide = function () {
            $ionicLoading.hide().then(function () {});
        };
    })

    .controller('ProjectPhotosCtrl', function ($scope, $stateParams, MyServices, $filter, $rootScope, $ionicModal, $ionicActionSheet, $cordovaCamera, $ionicLoading, $cordovaFileTransfer, $cordovaImagePicker) {
        $ionicModal.fromTemplateUrl('templates/modal/callmodal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.callmodal = modal;
        });
        var options = "location=no,toolbar=yes";
        var target = "_blank";
        var url = "";
        $scope.options = {
            currency: {
                numeral: true,
                numeralThousandsGroupStyle: 'lakh'
            }
        };
        $scope.openPDF = function (link) {
            // url = $filter('serverimage')(link);
            $scope.pdfURL = $filter('uploadpath')(link);
            $scope.finalURL = 'http://docs.google.com/gview?url=' + $scope.pdfURL + '&embedded=true';
            var ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
        };
        $scope.opencallmodal = function (details) {
            $scope.formData1 = details;
            $scope.callmodal.show();
        };
        $scope.closecallmodal = function () {
            $scope.callmodal.hide();
        };
        MyServices.componentFundflow($scope.componentId, function (data) {
            $scope.fundflow = data.data;
        });
        $scope.photos = {
            "pab": "",
            "state": "",
            "keyComponent": "",
            "institute": "",
            "component": $stateParams.componentId,
            "page": 1
        }
        $scope.formData = {};
        // $scope.photos.component = $stateParams.componentId;

        $scope.componentId = $stateParams.componentId;
        $scope.componentDataget = function () {
            MyServices.componentData($scope.photos, function (data) {
                $scope.projectPhotos = data.data;
                $scope.overview = data.data.compList[0];

                $scope.projects = data.data.compList[0].project;
                _.each($scope.projects, function (n) {
                    var photos = [];
                    _.each(n.photos, function (n1) {
                        if (n1.photo != "") {
                            photos.push(n1);
                        }
                    });
                    n.photos = _.chunk(photos, 4);
                });
                $scope.transaction = data.data.compList[0].transaction;
                $scope.transaction = _.groupBy($scope.transaction, 'transactionType');
                $scope.CenterToState = _.chunk($scope.transaction["Center To State"], 4);
                $scope.InstituteToVendor = _.chunk($scope.transaction["Institute To Vendor"], 4);
                $scope.StateToInstitute = _.chunk($scope.transaction["State To Institute"], 4);

                $scope.utilizationCertificates = data.data.compList[0].utilizationCertificates;
                console.log($scope.transaction, $scope.InstituteToVendor);

                console.log("photos", $scope.fundflow);
            });
        }

        $scope.componentDataget();


        MyServices.getComponentAllPhotos($scope.componentId, function (data) {
            if (data.value) {
                $scope.allPhotos = data.data;
                console.log($scope.allPhotos);

                $scope.allPhotos = _.chunk($scope.allPhotos, 2);
            }
        });
        $ionicModal.fromTemplateUrl('templates/modal/imageViewer.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.imageView = modal;
        });
        $scope.openImage = function (image) {
            $scope.image = image;
            $scope.imageView.show();
        };
        $scope.closeImage = function () {
            $scope.imageView.hide();
        };

        $scope.ucAdd = function (formData) {
            formData._id = $scope.componentId;
            MyServices.addUcToComponent(formData, function (data) {
                if (data.value) {
                    $scope.componentDataget();
                    $scope.closeUcForm();
                }
            });
        };
        $scope.edituc = function (formData) {
            formData._ucId = formData._id;
            formData._id = $scope.componentId;
            MyServices.updateUcOfComponent(formData, function (data) {
                if (data.value) {
                    $scope.componentDataget();
                    $scope.closeUcForm();
                }
            });
        };
        $scope.getfile = function () {
            $scope.filename = document.getElementById("myFile").value;
            console.log($scope.filename);

        }
        $ionicModal.fromTemplateUrl('templates/modal/create-ucform.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modaladd = modal;
        });
        $scope.openUcForm = function (modal, formData) {
            $scope.modalHeader = modal;
            $scope.formData = formData;
            $scope.formData.date = new Date($scope.formData.date);
            $scope.modaladd.show();
        };
        $scope.closeUcForm = function () {
            $scope.modaladd.hide();
        };
        $scope.adducimage = function (maxImage) {
            MyServices.showActionsheet(maxImage, function (Images) {
                console.log(Images);
                $scope.formData.images = Images[0];

            });
        }

    })

    //unwanted controller
    .controller('PhotoGalleryCtrl', function ($scope, $stateParams, MyServices, $ionicModal) {
        $scope.photo = {};
        $scope.photo.component = $stateParams.componentId;
        $scope.photo.projectId = $stateParams.projectId;
        MyServices.getProjectAllPhotos($scope.photo, function (data) {
            if (data.value) {
                $scope.allPhotos1 = data.data.photos;
                $scope.allPhotos1 = _.chunk($scope.allPhotos1, 3);
                console.log($scope.allPhotos1);
            }
        });
        $ionicModal.fromTemplateUrl('templates/modal/imageViewer.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.imageView = modal;
        });
        $scope.openImage = function (image) {
            $scope.image = image;
            $scope.imageView.show();
        };
        $scope.closeImage = function () {
            $scope.imageView.hide();
        };
    })