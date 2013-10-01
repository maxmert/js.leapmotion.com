(function () {

    var app = angular.module('leapDocApp');

    app.directive('docSection', function InjectingFunction() {
        //@TODO: inject template root.
        return {
            templateUrl: '/js/doc/directives/docSection.html',
            controller: function($scope){
            },
            compile: function CompilingFunction($templateElement, $templateAttributes) {

                return function LinkingFunction($scope, $linkElement, $linkAttributes) {
                    console.log('docSection attrs: ', $linkAttributes);
                };
            }
        };
    })
    ;

}) (window);