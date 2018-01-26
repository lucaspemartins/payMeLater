(function () {

    angular.module('Customers', [])
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        }
        ])
        .controller('CustomersListController', ['$scope', '$http', '$window',
            function ($scope, $http, $window) {

                $http({
                    method: 'GET',
                    url: '/Customers'
                }).then(function (success) {
                    $scope.customers = success.data;
                }, function (error) {

                });

                $scope.removeCustomer = function (cpf) {
                    var url = '/Customers/' + cpf;
                    $http({
                        method: 'DELETE',
                        url: url
                    }).then(function (success) {
                        var response = JSON.stringify(success);
                        if (response.indexOf("\"affectedRows\":1") > -1) {
                            alert("Customer with CPF: " + cpf + "\nwas deleted with success!");
                        }
                        else {
                            alert("Customer cannot be deleted!");
                        }
                        $window.location.reload();
                    }, function (error) {
                        alert(error);
                    });
                };

                $scope.callEditModal = function (customer) {
                    $scope.customer = customer;
                };

                $scope.customer = {
                    cpf: '',
                    customer_name: '',
                    cellphone: '',
                    telephone: '',
                    email: ''
                };

                $scope.editCustomer = function (customer) {

                    if (customer.cpf && customer.customer_name) {
                        var url = '/Customers/' + customer.cpf;
                        $http({
                            method: 'PUT',
                            url: url,
                            data: customer,
                            headers: { 'Content-Type' : 'application/json' }
                        }).then(function (success) {
                            var response = JSON.stringify(success);
                            console.log(response);
                            if (response.indexOf("\"affectedRows\":1") > -1) {
                                alert("Customer with CPF: " + customer.cpf + "\nwas edited successfully!");
                            }
                            else {
                                alert("Customer cannot be edited!\n\n" + response);
                            }
                        }, function (error) {
                            alert(JSON.stringify(error));
                        });
                        $window.location.reload();
                    }
                };

                $scope.refreshPage = function () {
                    $window.location.reload();
                };

            }])

        .controller('CustomersAddController', ['$scope', '$http', '$window',
            function ($scope, $http, $window) {

                $scope.addCustomer = function (customer) {
                    if (customer.cpf && customer.customer_name) {
                        $http({
                            method: 'POST',
                            url: '/Customers',
                            data: customer
                        }).then(function (success) {
                            alert("Customer with CPF: " + customer.cpf + "\nwas added successfully!");
                            $window.location.href = "../views/customerslist.html";
                        }, function (error) {
                            alert(error);
                        });
                    }
                };

                $scope.customer = {
                    cpf: '',
                    customer_name: '',
                    cellphone: '',
                    telephone: '',
                    email: ''
                };
            }])
})();

