angular.module('starter.controllers', ['starter.services', 'ngCordova', 'highcharts-ng', "chart.js"])


    .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $ionicPopup, $state) {
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

    })

    .controller('PlaylistCtrl', function ($scope, $stateParams) {})

    .controller('LoginCtrl', function ($scope, $stateParams, $ionicPopup, $state, MyServices, $ionicModal) {
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

    .controller('SearchCtrl', function ($scope, $stateParams) {})


    .controller('VendorListCtrl', function ($scope, $stateParams, MyServices, $ionicModal) {
        $scope.formData = {};
        // $scope.formData.type = "Institute";
        $scope.formData.type = $.jStorage.get('filter').Access;
        $scope.formData.type_id = $.jStorage.get('filter')._id;



        MyServices.getAllVendorList($scope.formData, function (data) {

            if (data.value) {
                $scope.vendorlist = data.data.vendor;
            }

        });
        $scope.formData1 = {};

        $scope.addVendorsubmit = function (formData) {
            $scope.formData1 = formData;
            $scope.formData1.added_by = $.jStorage.get('filter').Access;
            $scope.formData1.added_by_id = $.jStorage.get('filter')._id;
            MyServices.addVendor($scope.formData1, function (data) {
                if (data.value) {
                    $scope.formData1 = {};
                    $scope.closeVendor();
                    MyServices.getAllVendorList($scope.formData, function (data) {

                        if (data.value) {
                            $scope.vendorlist = data.data.vendor;
                        }

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

    })

    .controller('HomeCtrl', function ($scope, $stateParams, $rootScope, MyServices, $filter, $timeout, $ionicPopup, $state, $ionicTabsDelegate, $ionicPopover) {
        $rootScope.overviewChart = {};
        $scope.temp = 0;
        $scope.items = 0;
        $rootScope.percent_utilized = null;
        $rootScope.percent_Release = null;
        $scope.overviewChartshow = false;


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
        var dropDownData = {
            pab: "",
            state: "",
            component: "",
            institute: "",
            page: 1
        };
        var filter = $.jStorage.get("filter");
        if (filter.Access == "State") {
            dropDownData.state = filter._id;
        }
        if (filter.Access == "Institute") {
            dropDownData.institute = filter._id;
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
        $scope.loadData = function (dropDownData) {

            MyServices.getDashboardData(dropDownData, function (data) {
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
            MyServices.componentData(dropDownData, function (data) {
                $scope.componentData = data.data.compList;
                console.log($scope.componentData);

            });
            $scope.$broadcast('scroll.infiniteScrollComplete');

        }


        $scope.loadData(dropDownData);


        $scope.loadMore = function () {
            console.log("inside loadMore");
            dropDownData.page = dropDownData.page + 1;

            $scope.loadData(dropDownData);
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
            var dropDownData = {
                pab: "",
                state: "",
                component: "",
                institute: "",
                startData: 0,
                endData: 5
            };
            $scope.InstituePagination = null;

            console.log("filter", formData);
            $scope.filterCriteria = {};
            if (angular.isObject(formData.pab)) {
                // $scope.filterCriteria.pab = formData.pab._id;
                dropDownData.pab = formData.pab._id;
            }
            if (angular.isObject(formData.state)) {
                dropDownData.state = formData.state._id;
            }
            if (angular.isObject(formData.institute)) {
                // $scope.filterCriteria.institute = formData.institute._id;
                dropDownData.institute = formData.institute._id;
            }
            if (angular.isObject(formData.components)) {
                // $scope.filterCriteria.components = formData.components._id;
                dropDownData.components = formData.components._id;
            }
            if (formData.status) {
                // $scope.filterCriteria.componentStatus = formData.status;
                dropDownData.componentStatus = formData.status;
            }
            $scope.filter.close();
            console.log("filter", dropDownData);

            $scope.loadData(dropDownData);
            //  MyServices.getProjectReport($scope.filterCriteria,function(data) {
            //      console.log("filtered data",data);
            //      if(data){
            //     $scope.filter.close();
            //      }
            //  });
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

        $scope.options = {
            segmentShowStroke: false
        };
        $scope.colors = ["#4b64ff", "#91a4af", "#d8dcde"];
        $scope.override = {
            borderColor: ['#4b64ff', '#91a4af', '#d8dcde']
        };
        $scope.card = {};
        $scope.cardopen = function (index, flag) {
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
            borderColor: ["#525050", "#ada8a8", "#ffffff"]
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
            data1: [30, 55, 15],
            grant: '75,00,000',
            colors1: ["#003366", "#0099cc", "#ffffff"],
            override1: {
                borderColor: ["#003366", "#0099cc", "#ffffff"]
            },
            dot1: 'blue-dark',
            dot2: 'blue-light',
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
            data1: [50, 35, 15],
            dot1: 'yellow-dark',
            dot2: 'yellow-light',
            colors1: ["#6d5303", "#c3ad6a", "#ffffff"],
            override1: {
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
            data1: [40, 45, 15],
            dot1: 'grey-dark',
            dot2: 'grey-light',
            colors1: ["#525050", "#ada8a8", "#ffffff"],
            override1: {
                borderColor: ["#525050", "#ada8a8", "#ffffff"]
            },
            classcommerce: 'ecommerce-orange',
            grant: '45,00,000',
            name: 'Contruction of boys hostel',
            fundRecieved: ' 40,00,000',
        }];


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

    .controller('StateCtrl', function ($scope, $stateParams) {
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

    .controller('InstituteCtrl', function ($scope, $stateParams) {

        $scope.card = {};
        $scope.cardopen = function (index, flag) {
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

    // 
    .controller('OverviewCtrl', function ($scope, $stateParams, MyServices) {

        $scope.componentId = $stateParams.componentId;
        var dropDownData = {
            pab: "",
            state: "",
            component: "",
            institute: "",
            page: 1
        };
        dropDownData.component = $stateParams.componentId;

        MyServices.componentData(dropDownData, function (data) {
            $scope.overview = data.data.compList[0];
            console.log("***** inside componentData *****", $scope.overview);

            // if ($scope.overview.componentDetail._id.pabName) {
            //     $scope.pabName = $scope.overview.componentDetail._id.pabName.split('#')[1];
            //     $scope.labels = [$scope.overview.componentDetail._id.componentWorkStatus + "% Work Completed", ""];
            //     $scope.data = [$scope.overview.componentDetail._id.componentWorkStatus, 100 - $scope.overview.componentDetail._id.componentWorkStatus];
            // }

        });

        $scope.colors = ["#88c057", "#d8dcde"];
        $scope.override = {
            borderColor: ['#88c057', '#d8dcde']
        };

        $scope.funds = {
            allocated: 100,
            received: 60,
            value: 30
        };
    })

    .controller('FundFlowCtrl', function ($scope, $stateParams, MyServices, $ionicModal) {
        $scope.componentId = $stateParams.componentId;

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
        $scope.complete = {
            center: 30,
            state: 40,
            institute: 50
        };

    })

    // 
    .controller('MilestonesCtrl', function ($scope, $stateParams, MyServices, $rootScope, $ionicModal, $ionicActionSheet, $cordovaCamera, $ionicLoading, $cordovaFileTransfer, $cordovaImagePicker) {
        $scope.projectNotInProExpense = {};
        console.log("$scope.componentId   " + $stateParams.componentId);
        $scope.componentId = $stateParams.componentId;
        $scope.temp = "hiiiiiii";
        MyServices.componentProjects($scope.componentId, function (data) {
            $scope.fundUtil = 0;
            $scope.totalamt = 0;
            $scope.componentProjects = data.data;

            _.forEach($scope.componentProjects, function (value) {

                $scope.fundUtil = $scope.fundUtil + value.totalAmountReleased;
                $scope.totalamt = $scope.totalamt + value.totalValue;
            });
            console.log($scope.componentProjects);
        });
        // MyServices.getProjectsNotAvailInProjectExpense($scope.componentId, function (data) {

        //     $scope.projectNotInProExpense = data.data;
        //     console.log("projectNotInProExpense 2nd api call: ", $scope.projectNotInProExpense);

        //     angular.forEach($scope.projectNotInProExpense, function (getNewPro, index) {
        //         getNewPro.totalAmountReleased = 0;
        //         getNewPro.vendor = [];
        //         $scope.componentProjects.push(getNewPro);
        //     });
        //     console.log($scope.componentProjects);

        //     console.log("getAllprojectOfComponent final merged data: ", $scope.getAllprojectOfComponent);
        // });

        MyServices.findAllProjectType(function (data) {
            $scope.findAllProjectType = data.data;
            console.log($scope.findAllProjectType);
        });
        MyServices.findAllAssetType(function (data) {
            $scope.findAllAssetType = data.data;
            console.log($scope.findAllAssetType);
        });
        $scope.formData = {};
        $scope.formData.type = "Institute";
        $scope.formData.type_id = "58a27f8fe146a5042e43312f";
        MyServices.getAllVendorList($scope.formData, function (data) {
            console.log(data);
            if (data.value) {
                $scope.vendorlist = data.data.vendor;
            }

        });
        $scope.viewData = {};
        $scope.viewAll = function (id) {
            $scope.viewData.projectId = id;
            $scope.viewData.componentId = $stateParams.componentId;
            MyServices.getProjectAllNotes($scope.viewData, function (data) {
                console.log(data);
                $scope.AllNotes = data.data.notes;
                $scope.openComment();
            });
        }
        $scope.allocationData = {};
        $scope.addAllocation = function (formData, id) {
            $scope.allocationData.project_id = {};
            $scope.allocationData.project_id = $rootScope.id;
            // $scope.allocation.componentId = $stateParams.componentId;
            $scope.allocationData.allocation = formData.allocation;
            $scope.allocationData.vendor_id = formData.vendorid._id;
            MyServices.vendorAllocation($scope.allocationData, function (data) {
                if (data.value) {
                    $scope.allocationData = {};
                    $scope.closePaymentEdit();

                }
                console.log(data);
                // $scope.AllNotes=data.data.notes;
            });
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
                    $scope.commentData = null;
                    $scope.comment.text = null;
                    console.log(data);
                }

                // $scope.openComment();
            });
        }

        $scope.project = {};
        $scope.project.components = $stateParams.componentId;
        $scope.createprojectFun = function (project) {

            console.log("**** Inside createProject *****", project);

            $scope.project = project;
            $scope.project.components = $scope.componentId;

            console.log("**** Inside createProject $scope.project*****", $scope.project);

            MyServices.createProject($scope.project, function (data) {

                $scope.project = data.data;
                console.log($scope.project);
                if (data.value) {
                    MyServices.componentProjects($scope.componentId, function (data) {
                        $scope.componentProjects = data.data;
                        _.forEach($scope.componentProjects, function (value) {
                            $scope.fundUtil = $scope.fundUtil + value.totalAmountReleased;
                        });
                        console.log($scope.componentProjects);
                    });
                    $scope.closeCreate();
                }
            });

        }
        $scope.EditprojectFun = function (project) {
            $scope.project = project;
            $scope.project.components = $scope.componentId;
            $scope.project._id = $rootScope.id;
            console.log(project);

            MyServices.updateProject($scope.project, function (data) {
                $scope.project = data.data;
                console.log($scope.project);
                if (data.value) {
                    MyServices.componentProjects($scope.componentId, function (data) {
                        $scope.componentProjects = data.data;
                        console.log($scope.componentProjects);
                    });
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
                    $scope.componentId = $stateParams.componentId;
                    MyServices.componentProjects($scope.componentId, function (data) {
                        $scope.fundUtil = 0;
                        $scope.totalamt = 0;
                        $scope.componentProjects = data.data;
                        _.forEach($scope.componentProjects, function (value) {
                            console.log(value);
                            $scope.fundUtil = $scope.fundUtil + value.totalAmountReleased;
                            $scope.totalamt = $scope.totalamt + value.totalValue;
                        });
                        console.log($scope.componentProjects);
                    });
                }
            });
        }
        //picture upload action sheet popup--------------------------------------------
        $scope.showActionsheet = function () {
            $ionicActionSheet.show({
                //  titleText: 'choose option',
                buttons: [{
                    text: '<i class="icon ion-ios-camera-outline"></i> Choose from gallery'
                }, {
                    text: '<i class="icon ion-images"></i> Take from camera'
                }, {
                    text: '<input type="file" value="" accept="application/pdf,application/vnd.ms-excel">'
                }],
                //  destructiveText: 'Delete',
                cancelText: 'Cancel',
                cancel: function () {
                    console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    console.log('BUTTON CLICKED', index);
                    if (index === 0) {
                        $scope.getImageSaveContact();
                    } else if (index === 1) {
                        $scope.openCamera();

                    } else {
                        console.log("hello pdf");
                    }
                    return true;
                },
                destructiveButtonClicked: function () {
                    console.log('DESTRUCT');
                    return true;
                }
            });
        };
        //take image from camera --------------------------------------------------------
        $scope.openCamera = function () {

            var cameraOptions = {
                quality: 90,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: false,
                encodingType: 0,
                targetWidth: 1200,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: true,
                correctOrientation: true
            };
            $cordovaCamera.getPicture(cameraOptions).then(function (imageData) {
                $scope.imageSrc = "data:image/jpeg;base64," + imageData;
                $scope.uploadImage($scope.imageSrc);



            }, function (err) {

                console.log(err);
            });
        };

        //cordovaImagePicker function------------------------------------------------------
        $scope.getImageSaveContact = function () {
            // Image picker will load images according to these settings
            var options = {
                maximumImagesCount: 20, // Max number of selected images
                width: 800,
                height: 800,
                quality: 80 // Higher is better
            };
            $cordovaImagePicker.getPictures(options).then(function (results) {
                console.log(results);
                _.forEach(results, function (value) {
                    $scope.uploadImage(value);
                });

                // $scope.dataPhoto={};
                // $scope.dataPhoto.photos1=$scope.photos1;
                // $scope.dataPhoto.componentId = $stateParams.componentId;
                // $scope.dataPhoto.projectId = $rootScope.id;
                // MyServices.addProjectPhotos($scope.dataPhoto, function(data) {
                //
                //     if (data.value) {
                //       console.log(data);
                //
                //       $scope.photodata = {};
                //       $scope.photodata.componentId = $stateParams.componentId;
                //       $scope.photodata.projectId = $rootScope.id;
                //       MyServices.getProjectAllPhotos($scope.photodata, function(data) {
                //           if (data.value) {
                //             console.log(data);
                //             $scope.allPhotos1 = data.data.photos;
                //             $scope.allPhotos1 = _.chunk($scope.allPhotos1, 3);
                //             console.log($scope.allPhotos1);
                //           }
                //       });
                //     }
                // });
                // _.forEach(results, function (value) {
                //   $scope.photos.push(value);
                // });

            }, function (error) {
                console.log('Error: ' + JSON.stringify(error)); // In case of error
            });
        };

        //upload image----------------------------------------------------------------
        $scope.uploadImage = function (imageURI) {
            console.log('imageURI', imageURI);
            // $scope.showLoading('Uploading Image...', 10000);
            $cordovaFileTransfer.upload(adminurl + 'upload', imageURI)
                .then(function (result) {
                    // Success!
                    // $scope.hideLoading();
                    result.response = JSON.parse(result.response);
                    console.log(result.response.data[0]);
                    $scope.dataPhoto = {};
                    $scope.dataPhoto.photos = [];
                    // $scope.photo=result.response.data[0];
                    // $scope.dataPhoto.photos=$scope.photo;
                    $scope.dataPhoto.photos.push({
                        "photo": result.response.data[0]
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
                    // $scope.photos1.push({
                    //   "photo": result.response.data[0]});
                }, function (err) {
                    // Error
                }, function (progress) {
                    // constant progress updates
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
        $scope.opentransaction = function () {
            $scope.transaction.show();
        };
        $scope.closetransaction = function () {
            $scope.transaction.hide();
        };
        $scope.priceSlider = 150;
        $scope.payment = {};

        $scope.showPayment = function (index, flag) {
            console.log(index, flag);
            $scope.payment[index] = flag;
        }
        // $scope.hidePayment = function () {
        //   $scope.payment = false;
        // }

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

        $ionicModal.fromTemplateUrl('templates/modal/payment-edit.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalpayment = modal;
        });
        $scope.openPaymentEdit = function () {
            $scope.modalpayment.show();
        };
        $scope.closePaymentEdit = function () {
            $scope.modalpayment.hide();
        };

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
            console.log(id);
            $rootScope.id = id;
            $scope.modalutil.show();
        };
        $scope.closeUtilizationEdit = function () {
            $scope.modalutil.hide();
        };

        $ionicModal.fromTemplateUrl('templates/modal/editproject.html', {
            scope: $scope,
            // animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.Editproject = modal;
        });
        $scope.openEdit = function () {
            $scope.show();
            MyServices.ProjectGetOne($rootScope.id, function (data) {
                $scope.show();
                if (data.value) {
                    $scope.hide();
                    $scope.project = data.data;
                    console.log($scope.project);
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
            }).then(function () {
                console.log("The loading indicator is now displayed");
            });
        };
        $scope.hide = function () {
            $ionicLoading.hide().then(function () {
                console.log("The loading indicator is now hidden");
            });
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


        $ionicModal.fromTemplateUrl('templates/modal/utilization-detail.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modaladd = modal;
        });
        $scope.openUtilizationEdit = function () {
            $scope.modaladd.show();
        };
        $scope.closeUtilizationEdit = function () {
            $scope.modaladd.hide();
        };
    })

    .controller('ProjectPhotosCtrl', function ($scope, $stateParams, MyServices) {
        $scope.componentId = $stateParams.componentId;
        // $scope.componentId = "58cd40c43ae8bf6d8be31dd5";
        MyServices.getComponentAllPhotos($scope.componentId, function (data) {
            if (data.value) {
                $scope.allPhotos = data.data;
                console.log($scope.allPhotos);

                $scope.allPhotos = _.chunk($scope.allPhotos, 2);
            }
        });



    })
    .controller('PhotoGalleryCtrl', function ($scope, $stateParams, MyServices, $ionicModal) {
        $scope.photo = {};
        $scope.photo.componentId = $stateParams.componentId;
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
    });