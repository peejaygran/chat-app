shappyWise.directive('ngScroll', ['$timeout', function($timeout) {
    return {
        scope: {
            ngScroll: "="
        },
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.$watchCollection('ngScroll', function(newVal) {

                if (element[0].offsetHeight + element[0].scrollTop >= element[0].scrollHeight) {
                    if (newVal) {
                        $timeout(function() {
                            element[0].scrollTop = element[0].scrollHeight;
                        }, 0);
                    }
                }

            });
        }
    };
}]);
