var adminurl = "http://192.168.0.24/api/";
// var adminurl = "http://rusabeta.wohlig.com/api/";//server
var imgpath = adminurl + "/uploads/";



angular.module('starter.services', [])
  .factory('MyServices', function($http) {
     return {

      //  getProjectReport: function(callback) {
      //   return $http({
      //     url: adminurl + 'Project/getProjectReport',
      //     method: "POST"
      //   }).success(callback);
      // },
         login: function(formData,callback) {
        return $http({
          url: adminurl + 'User/LoginUser',
          method: "POST",
           withCredentials: true,
          data: formData
        }).success(callback);
      },
       getProjectReport: function(formData,callback) {
        return $http({
          url: adminurl + 'Project/getProjectReport',
          method: "POST",
           withCredentials: true,
          data: formData
        }).success(callback);
      },
       componentFundflow: function(id,callback) {
         var data ={
           id : id
         }
        return $http({
          url: adminurl + 'Transaction/componentFundflow',
          method: "POST",
           withCredentials: true,
          data: data
        }).success(callback);
      },
       componentOverview : function(id,callback) {
         var data ={
           id : id
         }
        return $http({
          url: adminurl + 'Transaction/componentOverview',
          method: "POST",
           withCredentials: true,
          data: data
        }).success(callback);
      },
         getTransactionReport: function(formData,callback) {
        return $http({
          url: adminurl + 'Transaction/getTransactionReport',
          method: "POST",
           withCredentials: true,
          data: formData
        }).success(callback);
      },
       findAllPab: function(callback) {
        return $http({
          url: adminurl + 'Pab/findAllPab',
          method: "POST"
        }).success(callback);
      },
       findAllState: function(callback) {
        return $http({
          url: adminurl + 'State/findAllState',
          method: "POST"
        }).success(callback);
      },
       findAllComponents: function(callback) {
        return $http({
          url: adminurl + 'Components/findAllComponents',
          method: "POST"
        }).success(callback);
      },
       findAllInstituteDashBoard: function(callback) {
        return $http({
          url: adminurl + 'Institute/findAllInstituteDashBoard',
          method: "POST"
        }).success(callback);
      },
      getAllVendorList: function(formData,callback) {
        return $http({
          url: adminurl + 'vendor/getAllVendorList',
          method: "POST",
          data: formData
        }).success(callback);
      },
      createProject: function(formData,callback) {
        return $http({
          url: adminurl + 'Project/save',
          method: "POST",
          data: formData
        }).success(callback);
      },
      ProjectGetOne: function(id,callback) {
        var Data={
          _id :id
        }
        return $http({
          url: adminurl + 'Project/getOne',
          method: "POST",
          data: Data
        }).success(callback);
      },
      updateProject: function(Data,callback) {
        return $http({
          url: adminurl + 'Project/updateProject',
          method: "POST",
          data: Data
        }).success(callback);
      },
      vendorAllocation: function(Data,callback) {
        return $http({
          url: adminurl + 'projectExpense/vendorAllocation',
          method: "POST",
          data: Data
        }).success(callback);
      },
      getComponentAllPhotos: function(id,callback) {
        var Data={
          _id :id
        }
        return $http({
          url: adminurl + 'project/getComponentAllPhotos',
          method: "POST",
          data: Data
        }).success(callback);
      },
        componentProjects: function(componentId,callback) {
          var id ={
            component : componentId
          }
        return $http({
          url: adminurl + 'ProjectExpense/componentProjects',
          method: "POST",
           withCredentials: true,
          data: id
        }).success(callback);
      },
        findAllProjectType: function(callback) {

        return $http({
          url: adminurl + 'projectType/findAllProjectType',
          method: "POST",
           withCredentials: true,
        }).success(callback);
      },
        findAllAssetType: function(callback) {

        return $http({
          url: adminurl + 'assetType/findAllAssetType',
          method: "POST",
           withCredentials: true,
        }).success(callback);
      },


     };
  });
