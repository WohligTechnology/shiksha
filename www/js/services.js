var adminurl = "http://192.168.0.10/api/";
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
     
       getProjectReport: function(formData,callback) {
        return $http({
          url: adminurl + 'Project/getProjectReport',
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
      }
  
     };
  });
