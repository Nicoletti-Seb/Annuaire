'use strict';

/**
 * @ngdoc function
 * @name Annuaire.controller:AjouterProjetCtrl
 * @description
 * # AjouterProjetCtrl
 * Controller of the Annuaire
 */
angular.module('Annuaire')
  .controller('AjouterProjetCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.success = false;
    $scope.msgSuccess = "";
    $scope.errorHttp = false;

    $scope.add = function(){
      $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Projects',
        { title:$scope.titre, description:$scope.description, year:$scope.annee  } )
        .success(function(data, status, headers, config) {
          $scope.msgSuccess = $scope.titre + " a été rajouté !";
          $scope.success = true;
        })
        .error(function(data, status, headers, config){
            $scope.errorHttp = true;
        });
    }

  }]);
