'use strict';

/**
 * @ngdoc function
 * @name Annuaire.controller:RechercherUtilisateurCtrl
 * @description
 * # RechercherUtilisateurCtrl
 * Controller of the Annuaire
 */
angular.module('Annuaire')
  .controller('RechercherUtilisateurCtrl', ['$scope', '$http', '$routeParams', '$location',
   function ($scope, $http, $routeParams, $location) {
    
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.success = false;
    $scope.msgSuccess = "";
    $scope.errorHttp = false;

    $scope.state = 'search';

    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users')
        .success(function(data) {
          $scope.users = data.data;
        }) 
        .error(function(data){
            $scope.errorHttp = true;
        });

    /**
    getProjetsAndRole permet de rajouter dans l'objet 'user' un attribut 'projects' 
    contenant l'ensemble des projets de 'user'.
    La fonction rajoute, pour chaque projet, un attribut role contenant le role
    de l'utilisateur. 

    */
    $scope.getProjectsAndRole = function( user ){
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/'+user.id+'/Projects')
        .success(function(data) {
          user.projects =  data.data;
          for (var i = 0; i < user.projects.length; i++) {
            $scope.getRole(user, user.projects[i]);
          };
        })
        .error(function(data){
            $scope.errorHttp = true;
        });
    };

    /**
      Rajoute le role de l'utilisateur durant son projet dans un attribut 'role'
      dans l'objet 'project'.
    */
    $scope.getRole = function ( user, project ){
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Roles?UserId='+user.id+'&ProjectId='+project.id)
        .success(function(data) {
          project.role = data.data[0].name;
        })
        .error(function(data){
            $scope.errorHttp = true;
        });
    }

    //-------------------UPDATE
    $scope.changeViewToModify = function(user){
      $scope.currentUser = user;
      $scope.getProjectsAndRole($scope.currentUser);
      $scope.state = 'modify';
      $scope.errorHttp = false;
      $scope.success = false;
    }

    $scope.changeViewToSearch = function(){
      $scope.currentUser = null;
      $scope.state = 'search';
      $scope.errorHttp = false;
      $scope.success = false;
    }

    $scope.updateUser = function(user){
      $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Users/'+user.id, user)
        .success(function(data) {
          $scope.msgSuccess = user.name + " " + user.surname + " a été mis à jour !!";
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
          var index = user.projects.indexOf(project);
          user.projects.splice(index, 1); 
        })
        .error(function(data){
            $scope.errorHttp = true;
        });
    }

    $scope.deleteUser = function(user){
        $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Users/'+user.id)
        .success(function(data){
          var index = $scope.users.indexOf(user);
          $scope.users.splice(index, 1); 
        })
        .error(function(){
          $scope.errorHttp = true;
        });
    }

  }]);
