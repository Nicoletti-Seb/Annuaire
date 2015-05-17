'use strict';

/**
 * @ngdoc function
 * @name Annuaire.controller:AjouterUtilisateurCtrl
 * @description
 * # AjouterUtilisateurCtrl
 * Controller of the Annuaire
 */
angular.module('Annuaire')
  .controller('AjouterUtilisateurCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.success = false;
    $scope.msgSuccess = "";
    $scope.errorHttp = false;

    $scope.add = function(){
      $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Users',
        { name:$scope.nom, surname:$scope.prenom, email:$scope.email, website:$scope.website } )
        .success(function(data, status, headers, config) {
          $scope.msgSuccess  = $scope.nom + " " + $scope.prenom + " a été rajouté !";
          $scope.success = true;
        })
        .error(function(data, status, headers, config){
            $scope.errorHttp = true;
        });
    }

  }]);
