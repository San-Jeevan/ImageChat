var myModule = angular.module('DMFilter', []);
myModule.filter('timeformatting', function () {
    return function (text) {
        return moment.utc(text).fromNow();
    };
})

myModule.filter('reverse', function () {
    return function (items) {
        return items.slice().reverse();
    };
});