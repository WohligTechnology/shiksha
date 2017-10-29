// var adminurl = "http://192.168.1.131/api/";
// var adminurl = "http://wohlig.io/api/";
// var adminurl = "http://rusa.wohlig.co.in/api/";//server
// var adminurl = "http://rusabeta.wohlig.com/api/";//server
// var adminurl = "https://rusa.thegraylab.com/api/";//server
var adminurl = "https://rusamhrd.tiss.edu/api/"; //server
var imgurl = adminurl + "upload/";
var imgpath = imgurl + "readFile?file=";



angular.module('starter.services', [])
  .factory('MyServices', function ($http, $ionicActionSheet, $cordovaCamera, $ionicLoading, $cordovaFileTransfer, $cordovaImagePicker) {
    return {
      login: function (formData, callback) {
        return $http({
          url: adminurl + 'User/LoginUser',
          method: "POST",
          withCredentials: true,
          data: formData
        }).success(callback);
      },
      userSearch: function (formData, callback) {
        return $http({
          url: adminurl + 'User/search',
          method: "POST",
          withCredentials: true,
          data: formData
        }).success(callback);
      },
      getDashboardData: function (formData, callback) {
        return $http({
          url: adminurl + 'components/getDashboardData',
          method: "POST",
          withCredentials: true,
          data: formData
        }).success(callback);
      },
      componentData: function (formData, callback) {
        return $http({
          url: adminurl + 'components/componentData',
          method: "POST",
          withCredentials: true,
          data: formData
        }).success(callback);
      },
      addUcToComponent: function (formData, callback) {
        return $http({
          url: adminurl + 'components/addUcToComponent',
          method: "POST",
          withCredentials: true,
          data: formData
        }).success(callback);
      },
      updateUcOfComponent: function (formData, callback) {
        return $http({
          url: adminurl + 'components/updateUcOfComponent',
          method: "POST",
          withCredentials: true,
          data: formData
        }).success(callback);
      },
      componentFundflow: function (id, callback) {
        var data = {
          component: id
        }
        return $http({
          url: adminurl + 'components/getComponentFundflow',
          method: "POST",
          withCredentials: true,
          data: data
        }).success(callback);
      },
      componentOverview: function (id, callback) {
        var data = {
          component: id
        }
        return $http({
          url: adminurl + 'Transaction/componentOverview',
          method: "POST",
          withCredentials: true,
          data: data
        }).success(callback);
      },
      getTransactions: function (id, callback) {
        var data = {
          _id: id
        }
        return $http({
          url: adminurl + 'Transaction/getOne',
          method: "POST",
          withCredentials: true,
          data: data
        }).success(callback);
      },
      findAllInstituteDashBoard: function (id, callback) {
        var data = {
          state: id
        }
        // console.log(data);
        return $http({
          url: adminurl + 'Institute/findAllInstituteDashBoard',
          method: "POST",
          withCredentials: true,
          data: data
        }).success(callback);
      },
      addProjectPhotos: function (formData, callback) {
        return $http({
          url: adminurl + 'project/addProjectPhotos',
          method: "POST",
          withCredentials: true,
          data: formData
        }).success(callback);
      },
      changeStatus: function (formData, callback) {
        return $http({
          url: adminurl + 'Project/changeStatus',
          method: "POST",
          withCredentials: true,
          data: formData
        }).success(callback);
      },
      getProjectAllNotes: function (formData, callback) {
        return $http({
          url: adminurl + 'Project/getProjectAllNotes',
          method: "POST",
          withCredentials: true,
          data: formData
        }).success(callback);
      },
      addProjectNotes: function (formData, callback) {
        return $http({
          url: adminurl + 'Project/addProjectNotes',
          method: "POST",
          withCredentials: true,
          data: formData
        }).success(callback);
      },
      findAllPab: function (callback) {
        return $http({
          url: adminurl + 'Pab/findAllPab',
          method: "POST"
        }).success(callback);
      },
      findAllState: function (callback) {
        return $http({
          url: adminurl + 'State/findAllState',
          method: "POST"
        }).success(callback);
      },
      findAllComponents: function (callback) {
        return $http({
          url: adminurl + 'Keycomponents/findAllKeyComponents',
          method: "POST"
        }).success(callback);
      },
      getAllVendorList: function (formData, callback) {
        return $http({
          url: adminurl + 'vendor/getAllVendorList',
          method: "POST",
          data: formData
        }).success(callback);
      },
      findAllVendor: function (formData, callback) {
        return $http({
          url: adminurl + 'vendor/findAllVendor',
          method: "POST",
          data: formData
        }).success(callback);
      },
      getProfile: function (formData, callback) {
        return $http({
          url: adminurl + 'user/getOne',
          method: "POST",
          data: formData
        }).success(callback);
      },
      addVendorToGlobalList: function (formData, callback) {
        return $http({
          url: adminurl + 'vendor/addVendorToGlobalList',
          method: "POST",
          data: formData
        }).success(callback);
      },
      addVendorToList: function (formData, callback) {
        return $http({
          url: adminurl + 'vendor/addVendorToList',
          method: "POST",
          data: formData
        }).success(callback);
      },
      createProject: function (formData, callback) {
        return $http({
          url: adminurl + 'Project/addProjectFromApp',
          method: "POST",
          data: formData
        }).success(callback);
      },
      ProjectGetOne: function (id, callback) {
        var Data = {
          _id: id
        }
        return $http({
          url: adminurl + 'Project/findOneProject',
          method: "POST",
          data: Data
        }).success(callback);
      },
      updateProject: function (Data, callback) {
        return $http({
          url: adminurl + 'Project/updateProject',
          method: "POST",
          data: Data
        }).success(callback);
      },
      vendorAllocation: function (Data, callback) {
        return $http({
          url: adminurl + 'projectExpense/vendorWorkOrderAllocation',
          method: "POST",
          data: Data
        }).success(callback);
      },
      getWorkOrderToEdit: function (Data, callback) {
        return $http({
          url: adminurl + 'projectExpense/getWorkOrderToEdit',
          method: "POST",
          data: Data
        }).success(callback);
      },
      getComponentAllPhotos: function (id, callback) {
        var Data = {
          componentId: id
        }
        return $http({
          url: adminurl + 'project/getComponentAllPhotos',
          method: "POST",
          data: Data
        }).success(callback);
      },
      getProjectAllPhotos: function (data, callback) {
        return $http({
          url: adminurl + 'Project/getProjectAllPhotos',
          method: "POST",
          data: data
        }).success(callback);
      },
      componentProjects: function (componentId, callback) {
        var id = {
          component: componentId
        }
        return $http({
          url: adminurl + 'project/componentProjects',
          method: "POST",
          withCredentials: true,
          data: id
        }).success(callback);
      },
      findAllProjectType: function (callback) {

        return $http({
          url: adminurl + 'projectType/findAllProjectType',
          method: "POST",
          withCredentials: true,
        }).success(callback);
      },
      findAllAssetType: function (callback) {

        return $http({
          url: adminurl + 'assetType/findAllAssetType',
          method: "POST",
          withCredentials: true,
        }).success(callback);
      },


      getTransactionReport: function (formData, callback) {
        return $http({
          url: adminurl + 'Transaction/getTransactionReport',
          method: "POST",
          withCredentials: true,
          data: formData
        }).success(callback);
      },
      searchVendor: function (formData, callback) {
        return $http({
          url: adminurl + 'vendor/searchVendor',
          method: "POST",
          withCredentials: true,
          data: formData
        }).success(callback);
      },
      getWorkOrderTransactions: function (formData, callback) {
        return $http({
          url: adminurl + 'projectExpense/getWorkOrderTransactions',
          method: "POST",
          withCredentials: true,
          data: formData
        }).success(callback);
      },

      vendorWorkOrderRelease: function (formData, callback) {
        return $http({
          url: adminurl + 'transaction/vendorWorkOrderRelease',
          method: "POST",
          withCredentials: true,
          data: formData
        }).success(callback);
      },
      vendorWorkOrderReleaseUpdate: function (formData, callback) {
        return $http({
          url: adminurl + 'transaction/vendorWorkOrderReleaseUpdate',
          method: "POST",
          withCredentials: true,
          data: formData
        }).success(callback);
      },
      getProjectReport: function (formData, callback) {
        return $http({
          url: adminurl + 'Project/getProjectReport',
          method: "POST",
          withCredentials: true,
          data: formData
        }).success(callback);
      },
      getComponentsNotAvailInProject: function (formData, callback) {
        return $http({
          url: adminurl + 'Project/getComponentsNotAvailInProject',
          method: "POST",
          withCredentials: true,
          data: formData
        }).success(callback);
      },
      getProjectsNotAvailInProjectExpense: function (componentId, callback) {
        var id = {
          component: componentId
        }
        return $http({
          url: adminurl + 'ProjectExpense/getProjectsNotAvailInProjectExpense',
          method: "POST",
          withCredentials: true,
          data: id
        }).success(callback);
      },

      //  findAllInstituteDashBoard: function(callback) {
      //   return $http({
      //     url: adminurl + 'Institute/findAllInstituteDashBoard',
      //     method: "POST"
      //   }).success(callback);
      // },

      //image upload 


      showActionsheet: function (maxImage, callback) {
        var actionsheet = [];
        $ionicActionSheet.show({
          //  titleText: 'choose option',
          buttons: [{
              text: '<i class="icon ion-ios-camera-outline"></i> Choose from gallery'
            }, {
              text: '<i class="icon ion-images"></i> Take from camera'
            },
            // {
            //   text: '<i class="icon ion-document-text"></i> Take from file'
            // }
            // ,{
            //   text: '<i class="icon ion-document-text"></i> <input type="file" value="" accept="application/pdf,application/vnd.ms-excel" class="hw100"> Take from file'
            // }
          ],
          //  destructiveText: 'Delete',
          cancelText: 'Cancel',
          cancel: function () {
            console.log('CANCELLED');
          },
          buttonClicked: function (index) {
            console.log('BUTTON CLICKED', index);
            if (index === 0) {
              var options = {
                maximumImagesCount: maxImage, // Max number of selected images
                width: 800,
                height: 800,
                quality: 80 // Higher is better
              };
              cordova.plugins.diagnostic.isCameraAuthorized({
                successCallback: function (authorized) {
                  if (authorized == false) {
                    cordova.plugins.diagnostic.requestCameraAuthorization({
                      successCallback: function (status) {
                        $cordovaImagePicker.getPictures(options).then(function (results) {
                          var i = 0;
                          $ionicLoading.show({
                            template: 'Loading...',
                            duration: 3000
                          }).then(function () {});
                          _.forEach(results, function (value) {

                            $cordovaFileTransfer.upload(adminurl + 'upload', value)
                              .then(function (result) {
                                $ionicLoading.hide().then(function () {
                                  console.log("The loading indicator is now hidden");
                                });
                                result.response = JSON.parse(result.response);
                                console.log(result.response.data[0]);
                                actionsheet.push(result.response.data[0]);
                                i++;
                                if (results.length == i) {
                                  callback(actionsheet);
                                }
                              }, function (err) {
                                // Error
                              }, function (progress) {
                                // constant progress updates
                              });
                          });

                        }, function (error) {
                          console.log('Error: ' + JSON.stringify(error)); // In case of error
                        });
                      },
                      errorCallback: function (error) {
                        console.error(error);
                      }
                    });

                  } else {
                    $cordovaImagePicker.getPictures(options).then(function (results) {
                      var i = 0;
                      $ionicLoading.show({
                        template: 'Loading...',
                        duration: 3000
                      }).then(function () {});
                      _.forEach(results, function (value) {

                        $cordovaFileTransfer.upload(adminurl + 'upload', value)
                          .then(function (result) {
                            $ionicLoading.hide().then(function () {});
                            result.response = JSON.parse(result.response);
                            actionsheet.push(result.response.data[0]);
                            i++;
                            if (results.length == i) {
                              callback(actionsheet);
                            }
                          }, function (err) {
                            // Error
                          }, function (progress) {
                            // constant progress updates
                          });
                      });

                    }, function (error) {
                      console.log('Error: ' + JSON.stringify(error)); // In case of error
                    });
                  }
                },
                errorCallback: function (error) {
                  console.error("The following error occurred: " + error);
                }
              });
            } else if (index === 1) {
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
                var imageSrc = "data:image/jpeg;base64," + imageData;
                // $scope.showLoading('Uploading Image...', 10000);
                $ionicLoading.show({
                  template: 'Loading...',
                  duration: 3000
                }).then(function () {
                  console.log("The loading indicator is now displayed");
                });
                $cordovaFileTransfer.upload(adminurl + 'upload', imageSrc)
                  .then(function (result) {
                    $ionicLoading.hide().then(function () {
                      console.log("The loading indicator is now hidden");
                    });
                    result.response = JSON.parse(result.response);
                    console.log(result.response.data[0]);
                    actionsheet.push(result.response.data[0]);
                    callback(actionsheet);

                  }, function (err) {
                    // Error
                  }, function (progress) {
                    // constant progress updates
                  });
              }, function (err) {
                console.log(err);
              });
            } else {
              console.log("hello pdf");
              var fs = new $fileFactory();
              $ionicPlatform.ready(function () {
                fs.getEntriesAtRoot().then(function (result) {
                  $scope.files = result;
                }, function (error) {
                  console.error(error);
                });
                $scope.getContents = function (path) {
                  fs.getEntries(path).then(function (result) {
                    $scope.files = result;
                    $scope.files.unshift({
                      name: "[parent]"
                    });
                    fs.getParentDirectory(path).then(function (result) {
                      result.name = "[parent]";
                      $scope.files[0] = result;
                    });
                  });
                }
              });
            }
            return true;
          },
          destructiveButtonClicked: function () {
            console.log('DESTRUCT');
            return true;
          }
        });
        console.log("done");
      },
    };
  });