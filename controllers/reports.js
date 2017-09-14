(function () {

    angular.module('Reports', ['chart.js'])
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        }
        ])
        .controller('ReportsController', ['$scope', '$http', '$window',
            function ($scope, $http, $window) {

                Chart.defaults.global.responsive = true;

                $http({
                    method: 'GET',
                    url: 'https://selloncredit.herokuapp.com/Reports'
                }).then(function (success) {
                    $scope.reports = success.data;
                    $scope.labels = [];
                    $scope.data = [];

                    var reportLength = $scope.reports.length;
                    for (var i = 0; i < reportLength; i++) {
                        $scope.labels.push($scope.reports[i].product_name);
                        $scope.data.push($scope.reports[i].total_sold);
                    }
                }, function (error) {
                    alert(error + "\nCould not retrieve the report data!");
                });

            }])
})();

