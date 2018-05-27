(function () {

    angular.module('public')
        .service('UserProfileService', UserProfileService);

    UserProfileService.$inject = ['ApiPath', '$http'];

    function UserProfileService(ApiPath, $http) {
        var service = this;
        service.userProfile = null;

        service.saveUserProfile = function (userProfile) {
            service.userProfile = userProfile;
        };

        service.getUserProfile = function () {
            return service.userProfile;
        };

        service.getMenuItem = function (menuItemName) {

            $http.get(ApiPath + '/menu_items/' + menuItemName + '.json').then(function (response) {
                    var data = response.data;
                    return data;
                })
                .catch(function (err) {
                    return err;
                });
        };

    }

})();