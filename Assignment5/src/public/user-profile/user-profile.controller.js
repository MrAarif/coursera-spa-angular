(function () {
    "use strict";

    angular.module('public')
        .controller('UserProfileController', UserProfileController);

    UserProfileController.$inject = ['userProfileInfo'];

    function UserProfileController(userProfileInfo) {
        var vm = this;
        vm.isUserRegistered = false;

        if (userProfileInfo) {
            vm.isUserRegistered = true;
        }else{
            return;
        }

        vm.firstName = userProfileInfo.firstName;
        vm.lastName = userProfileInfo.lastName;
        vm.email = userProfileInfo.email;
        vm.phone = userProfileInfo.phone;
        vm.menuItem = userProfileInfo.menuItem;

    }

})();