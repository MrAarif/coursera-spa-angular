(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('ItemsController', ItemsController);


    ItemsController.$inject = ['MenuDataService', 'menuItems'];

    function ItemsController(MenuDataService, menuItems) {
        var vm = this;
        vm.items = menuItems;
    }

})();