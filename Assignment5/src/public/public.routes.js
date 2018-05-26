(function () {
  'use strict';

  angular.module('public')
    .config(routeConfig);

  /**
   * Configures the routes and views
   */
  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Routes
    $stateProvider
      .state('public', {
        abstract: true,
        templateUrl: 'src/public/public.html'
      })
      .state('public.home', {
        url: '/',
        templateUrl: 'src/public/home/home.html'
      })
      .state('public.menu', {
        url: '/menu',
        templateUrl: 'src/public/menu/menu.html',
        controller: 'MenuController',
        controllerAs: 'menuCtrl',
        resolve: {
          menuCategories: ['MenuService', function (MenuService) {
            return MenuService.getCategories();
          }]
        }
      })
      .state('public.menuitems', {
        url: '/menu/{category}',
        templateUrl: 'src/public/menu-items/menu-items.html',
        controller: 'MenuItemsController',
        controllerAs: 'menuItemsCtrl',
        resolve: {
          menuItems: ['$stateParams', 'MenuService', function ($stateParams, MenuService) {
            return MenuService.getMenuItems($stateParams.category);
          }]
        }

      })
      .state('public.signup', {
        url: '/signup',
        templateUrl: 'src/public/user-signup/user-signup.html',
        controller: 'UserSignUpController',
        controllerAs: 'userSignUpCtrl'
      })
      .state('public.myprofile', {
        url: '/myprofile',
        templateUrl: 'src/public/user-profile/user-profile.html',
        controller: 'UserProfileController',
        controllerAs: 'userProfileCtrl',
        resolve: {
          userProfileInfo: ['UserProfileService', function (UserProfileService) {
              return UserProfileService.getUserProfile();
            }]
        }
      });
  }
})();