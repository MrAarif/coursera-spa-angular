(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
        .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective() {

        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                items: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };
        return ddo;
    }

    function FoundItemsDirectiveController() {
        var list = this;
    }


    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var vm = this;
        vm.searchTerm = "";
        vm.found = [];
        vm.itemsFoundInSearch = true;

        vm.search = function () {
            if (vm.searchTerm === "") {
                vm.itemsFoundInSearch = false;
                vm.found = [];
                return;
            }
            MenuSearchService.getMatchedMenuItems(vm.searchTerm).then(function (response) {
                vm.itemsFoundInSearch = response.length > 0;
                vm.found = response;
            }).catch(function (errorResponse) {
                vm.itemsFoundInSearch = false;
                console.log(errorResponse);
            });
        };

        vm.removeItem = function (itemIndex) {
            vm.found.splice(itemIndex, 1);
        };
    }

    MenuSearchService.$inject = ['$q', '$http', 'ApiBasePath'];

    function MenuSearchService($q, $http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function (result) {
                var itemsToSearch = result.data.menu_items;
                var foundItems = [];
                for (var index = 0; index < itemsToSearch.length; index++) {
                    var currentItem = itemsToSearch[index];
                    var isMatched = currentItem.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
                    if (isMatched) {
                        foundItems.push(currentItem);
                    }
                }
                return foundItems;
            });
        };
    }

})();