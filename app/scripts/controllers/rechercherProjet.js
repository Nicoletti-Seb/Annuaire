'use strict';

/**
 * @ngdoc function
 * @name Annuaire.controller:RechercherProjetCtrl
 * @description
 * # RechercherProjetCtrl
 * Controller of the Annuaire
 */
angular.module('Annuaire')
  .controller('RechercherProjetCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.success = false;
    $scope.msgSuccess = "";
    $scope.errorHttp = false;

    $scope.state = 'search';

    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects')
        .success(function(data) {
          $scope.projects = data.data;
        })
        .error(function(data){
          $scope.errorHttp = true;
        });

    /**
    getProjetsAndRole permet de rajouter dans l'objet 'project' un attribut 'users' 
    contenant l'ensemble des utilisateurs du projet.
    La fonction rajoute, pour chaque utilisateur, un attribut role contenant le role
    de l'utilisateur. 

    */
    $scope.getProjectsAndRole = function( project ){
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/'+project.id+'/Users')
        .success(function(data) {
          project.users =  data.data;
          for (var i = 0; i < project.users.length; i++) {
            $scope.getRole(project.users[i], project);
          };
        })
        .error(function(data){
            $scope.errorHttp = true;
        });
    };

    /**
      Rajoute le role de l'utilisateur durant son projet dans un attribut 'role'
      dans l'objet 'user'.
    */
    $scope.getRole = function ( user, project ){
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Roles?UserId='+user.id+'&ProjectId='+project.id)
        .success(function(data) {
          user.role = data.data[0].name;
        })
        .error(function(data){
            $scope.errorHttp = true;
        });
    }

    //-------------------UPDATE
    $scope.changeViewToModify = function(project){
      $scope.currentProject = project;
      $scope.getProjectsAndRole($scope.currentProject);
      $scope.state = 'modify';
      $scope.errorHttp = false;
      $scope.success = false;
    }

    $scope.changeViewToSearch = function(project){
      $scope.currentProject = null;
      $scope.state = 'search';
      $scope.errorHttp = false;
      $scope.success = false;
    }

    $scope.updateProject = function(project){
      $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/'+project.id, project)
        .success(function(data) {
          $scope.msgSuccess = project.title + " a été mis à jour !!";
          $scope.success = true;
        })
        .error(function(data){
            $scope.errorHttp = true;
        });
    }

    //------------------DELETE 
    $scope.deleteRelationUP = function(user, project){
      $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/'+project.id+'/Users/'+user.id)
        .success(function(data) {
          var index = project.users.indexOf(user);
          project.users.splice(index, 1); 
        })
        .error(function(data){
            $scope.errorHttp = true;
        });
    }

    $scope.deleteProject = function(project){
      $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/'+project.id)
        .success(function(data){
          var index = $scope.projects.indexOf(project);
          $scope.projects.splice(index, 1); 
        })
        .error(function(){
          $scope.errorHttp = true;
        });
    }

  }]);
