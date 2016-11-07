(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', BuyController)
    .controller('AlreadyBoughtController', BoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  BuyController.$inject = ['ShoppingListCheckOffService'];

  function BuyController(ShoppingListCheckOffService) {
    var buyItem = this;

    buyItem.itemsToBuy = ShoppingListCheckOffService.getItemsToBuy();

    buyItem.markItemBought = function (itemIndex) {
      var itemToAdd = ShoppingListCheckOffService.getItem(itemIndex);
      ShoppingListCheckOffService.addBoughtItem(itemToAdd);

      ShoppingListCheckOffService.removeBoughtItem(itemIndex);
    };

    buyItem.isAllItemsBought = function () {
      return buyItem.itemsToBuy.length < 1;
    };
  }

  BoughtController.$inject = ['ShoppingListCheckOffService'];

  function BoughtController(ShoppingListCheckOffService) {
    var boughtItem=this;

    boughtItem.boughtItems=ShoppingListCheckOffService.getItemsBought();
    
    boughtItem.isNothingBought=function () {
      return boughtItem.boughtItems.length < 1;
    };

  }


  function ShoppingListCheckOffService() {

    var itemsToBuy = [{
      name: "cookies",
      quantity: 10
    }, {
      name: "sugar drink",
      quantity: 12
    }, {
      name: "chips",
      quantity: 5
    }, {
      name: "ice cream",
      quantity: 3
    }, {
      name: "cake",
      quantity: 2
    }];
    var itemsBought = [];

    this.getItemsToBuy = function () {
      return itemsToBuy;
    };

    this.getItemsBought = function () {
      return itemsBought;
    };

    this.getItem = function (itemIndex) {
      return itemsToBuy[itemIndex];
    };

    this.removeBoughtItem = function (itemIndex) {
      itemsToBuy.splice(itemIndex, 1);
    };

    this.addBoughtItem = function (item) {
      itemsBought.push(item);
    };

  }

})();