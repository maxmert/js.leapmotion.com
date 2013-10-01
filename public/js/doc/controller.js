(function () {
    var app = angular.module('leapDocApp');

    app.controller('documentation', function($scope, docData){

        docData($scope);

        $scope.foo = 'bar';

    });

})();