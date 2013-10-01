(function (window, _) {

    var app = angular.module('leapDocApp');

    app.directive('argument', function InjectingFunction($interpolate) {
        //@TODO: inject template root.

        function noLink(value){
            return !/^Leap\./.test(value);
        }

        return {
            scope: {value: '=arg'},
            templateUrl:"/js/doc/directives/argument.html",
            controller: function ($scope) {

                $scope.expression_type = function(){

                        if (noLink($scope.value.type)){
                            return '';
                        } else {
                            return 'linked'
                        }

                };

                $scope.link = function(){
                    return '#' + $scope.value.type;
                }

                $scope.label = function(){
                    return _.compact($scope.value.title, $scope.value.name, $scope.value.type, 'param')[0];
                }

                $scope.optional = function(){
                    return $scope.value.type.optional ? '?' : '';
                }
            },
            compile: function CompilingFunction($templateElement, $templateAttributes) {

                return function LinkingFunction($scope, $linkElement, $linkAttributes) {

                };
            }
        };
    });

})(window, _);