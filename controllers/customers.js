(function () {

    angular.module('Customers', [])
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        }
        ])
        .controller('CustomersListController', ['$scope', '$http', '$window',
            function ($scope, $http, $window) {
                var customers = [];

                $http({
                    method: 'GET',
                    url: 'http://localhost:3000/Customers'
                }).then(function (success) {
                    $scope.customers = success.data;
                }, function (error) {

                });

                $scope.customer = {
                    cpf: '',
                    name: '',
                    cellphone: '',
                    telephone: '',
                    email: ''
                };

                $scope.removeCustomer = function (cpf) {
                    var url = 'http://localhost:3000/Customers/' + cpf;
                    $http({
                        method: 'DELETE',
                        url: url
                    }).then(function (success) {
                        $window.location.reload();
                    }, function (error) {

                    });
                };
            }])

        .controller('CustomersAddController', ['$scope', '$http', '$window',
            function ($scope, $http, $window) {
                $scope.addCustomer = function(customer) {
                    $http({
                        method: 'POST',
                        url: 'http://localhost:3000/Customers',
                        data: customer
                    }).then(function (success) {
                        $window.location.reload();
                    }, function (error) {

                    });
                }

                $scope.customer = {
                    cpf: '',
                    customer_name: '',
                    cellphone: '',
                    telephone: '',
                    email: ''
                };
            }]);


})();

