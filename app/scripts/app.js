'use strict';

/**
 * @ngdoc overview
 * @name Annuaire
 * @description
 * # Annuaire
 *
 * Main module of the application.
 */
angular
  .module('Annuaire', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'views/rechercherUtilisateur.html',
        controller: 'RechercherUtilisateurCtrl'
      })
    .when('/ajouterUtilisateur', {
        templateUrl: 'views/ajouterUtilisateur.html',
        controller: 'AjouterUtilisateurCtrl'
      })
    .when('/rechercherProjet', {
        templateUrl: 'views/rechercherProjet.html',
        controller: 'RechercherProjetCtrl'
      })
    .when('/ajouterProjet', {
        templateUrl: 'views/ajouterProjet.html',
        controller: 'AjouterProjetCtrl'
      })
    .when('/associer', {
        templateUrl: 'views/assProjetUtilisateur.html',
        controller: 'AssocierCtrl'
      })
    .otherwise({
        redirectTo: '/'
      });
  });
