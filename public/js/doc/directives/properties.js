(function () {

    var app = angular.module('leapDocApp');

    app.directive('properties', function InjectingFunction() {
        //@TODO: inject template root.
        return {
            templateUrl: '/js/doc/directives/properties.html',
            scope: {properties: '=props'},
            controller: function ($scope) {

                $scope.no_properties = function (section_item) {
                    if (!$scope.properties) return false;
                    return ($scope.properties.length < 1);
                }
            },
            compile: function CompilingFunction($templateElement, $templateAttributes) {

                return function LinkingFunction($scope, $linkElement, $linkAttributes) {
                    console.log('docSection attrs: ', $linkAttributes);
                };
            }
        };
    });

})(window);