// var adminurl = "http://192.168.0.16/api/";
var adminurl = "http://wohlig.io/api/";
// var adminurl = "http://rusa.wohlig.co.in/api/";//server
// var adminurl = "http://rusabeta.wohlig.com/api/";//server
// var adminurl = "https://rusa.thegraylab.com/api/";//server
var imgurl = adminurl + "upload/";
var imgpath = imgurl + "readFile?file=";



angular.module('starter.services', [])
  .factory('MyServices', function ($http) {
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
      addVendor: function (formData, callback) {
        return $http({
          url: adminurl + 'vendor/addVendor',
          method: "POST",
          data: formData
        }).success(callback);
      },
      vendorAllocation: function (formData, callback) {
        return $http({
          url: adminurl + 'projectExpense/vendorAllocation',
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
          url: adminurl + 'projectExpense/vendorAllocation',
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
    };
  });