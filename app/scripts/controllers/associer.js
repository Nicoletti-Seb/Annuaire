'use strict';

/**
 * @ngdoc function
 * @name AjouterUtilisateurCtrl.controller:AssocierCtrl
 * @description
 * # AssocierCtrl
 * Controller of the AjouterUtilisateurCtrl
 */
angular.module('Annuaire')
  .controller('AssocierCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.success = false;
    $scope.msgSuccess = "";
    $scope.errorHttp = false;

    $scope.currentUser = null;
    $scope.changeCurrentUser = function(user){
    	if( $scope.currentUser != user ){
			$scope.currentUser = user;
  		}
  		else{
  			$scope.currentUser = null;
  		}
    }

    $scope.currentProject = null;
    $scope.changeCurrentProject = function(project){
    	if( $scope.currentProject != project ){
  			$scope.currentProject = project;
  		}
  		else{
  			$scope.currentProject = null;
  		}
    }

    $scope.associateUserToProject = function(){
       $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Roles',
       {name:$scope.nameRole, UserId:$scope.currentUser.id, ProjectId:$scope.currentProject.id })
        .success(function(data) {
          $scope.msgSuccess = $scope.currentUser.name + " " 
              +$scope.currentUser.surname + " a été rajouté au projet " + $scope.currentProject.title;
          $scope.success = true;
        })
        .error(function(data){
            $scope.errorHttp = true;
        });
    }

    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects')
        .success(function(data) {
          $scope.projects = data.data;
        })
        .error(function(data){
            $scope.errorHttp = true;
        });

   	$http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users')
        .success(function(data) {
          $scope.users = data.data;
        }) 
        .error(function(data){
            $scope.errorHttp = true;
        });

}]);
