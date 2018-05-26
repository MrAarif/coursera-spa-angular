(function () {

    angular.module('public')
        .service('UserSignUpService', UserSignUpService);

    UserSignUpService.$inject = ['ApiPath', '$http', '$q'];

    function UserSignUpService(ApiPath, $http, $q) {
        var service = this;
        
        service.menuItemExists = function (menuItemName) {

            var defer = $q.defer();
            $http.get(ApiPath + '/menu_items/' + menuItemName + '.json').then(function (response) {
                var data = response.data;
                defer.resolve(data);          
            })
            .catch(function (err) {
                defer.resolve(null);
            });
            return defer.promise;
        };
    }

})();