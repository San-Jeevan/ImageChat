var myModule = angular.module('RISKFilter', []);
myModule.filter('timeformatting', function () {
    return function (text) {
        return moment(text).format('HH:mm:ss');
    };
})

myModule.filter('reverse', function () {
    return function (items) {
        return items.slice().reverse();
    };
});