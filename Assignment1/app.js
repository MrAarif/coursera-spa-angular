(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject=['$scope'];
function LunchCheckController ($scope) {
  $scope.dishes='';
     $scope.showFeedback=false;

     $scope.feedback='';

     $scope.checkLunch=function(){
       $scope.showFeedback=true;

       if($scope.dishes==""){
         $scope.feedback='Please enter data first';
       }
       else{
         var dishesList=$scope.dishes.split(',');
         var dishesCount=dishesList.length;
         if(dishesCount<=3){
           $scope.feedback='Enjoy!';
         }
         else if(dishesCount>3){
           $scope.feedback='Too much!';
         }
       }
     };
};

})();
