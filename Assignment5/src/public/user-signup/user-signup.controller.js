(function () {
    "use strict";

    angular.module('public')
        .controller('UserSignUpController', UserSignUpController);

    UserSignUpController.$inject = ['UserSignUpService', 'UserProfileService'];

    function UserSignUpController(UserSignUpService, UserProfileService) {
        var vm = this;

        vm.showError = false;
        vm.showSuccess = false;

        vm.phonePattern = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

        vm.signup = function () {

            var userProfile = {
                firstName: vm.firstName,
                lastName: vm.lastName,
                email: vm.email,
                phone: vm.phone,
                menuItemNumber: vm.menuItemNumber
            };

            UserSignUpService.menuItemExists(userProfile.menuItemNumber.toUpperCase()).then(function (response) {
                if (response) {
                    vm.showError = false;
                    vm.showSuccess = true;
                    userProfile.menuItem = response;
                    UserProfileService.saveUserProfile(userProfile);
                } else {
                    vm.showSuccess = false;
                    vm.showError = true;
                }
            }).catch(function (err) {
                vm.showSuccess = false;
                vm.showError = true;
            });

        };

    }

})();