﻿var myModule = angular.module('RISKdirectives', []);
myModule.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };

});

myModule.directive('ngFastSwitch', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 220) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngFastSwitch);
                });

                event.preventDefault();
            }
        });
    };
});


