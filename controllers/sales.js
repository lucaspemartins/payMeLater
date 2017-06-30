(function () {

    angular.module('Sales', [])
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        }
        ])
        .controller('SalesListController', ['$scope', '$http', '$window',
            function ($scope, $http, $window) {

                $http({
                    method: 'GET',
                    url: 'http://localhost:3000/Sales'
                }).then(function (success) {
                    $scope.sales = success.data;
                }, function (error) {

                });

                $scope.removeSale = function (code) {
                    var url = 'http://localhost:3000/Sales/' + code;
                    $http({
                        method: 'DELETE',
                        url: url
                    }).then(function (success) {
                        var response = JSON.stringify(success);
                        if (response.indexOf("\"affectedRows\":1") > -1) {
                            alert("Sale with Code: " + code + "\nwas deleted with success!");
                        }
                        else {
                            alert("Sale cannot be deleted!\n" + response);
                        }
                        $window.location.reload();
                    }, function (error) {
                        alert(error);
                    });
                };

                $scope.callEditModal = function (sale) {
                    $scope.sale = sale;
                };

                $scope.sale = {
                    customers_cpf: '',
                    customer_name: '',
                    products_product_code: '',
                    products_product_version: '',
                    product_name: '',
                    quantity: '',
                    price: ''
                };

                $scope.editSale = function (sale) {

                    if (sale.quantity) {
                        var saleData = {
                            customers_cpf: sale.customers_cpf,
                            products_product_code: sale.products_product_code,
                            products_product_version: sale.products_product_version,
                            quantity: sale.quantity
                        };
                        var url = 'http://localhost:3000/Sales/' + sale.quantity;
                        $http({
                            method: 'PUT',
                            url: url,
                            data: saleData
                        }).then(function (success) {
                            var response = JSON.stringify(success);
                            alert(response);
                            if (response.indexOf("\"affectedRows\":1") > -1) {
                                alert("Sale with Code: " + sale.products_product_code + "\nwas edited successfully!");
                            }
                            else {
                                alert("Sale cannot be edited!\n\n" + response);
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

                $scope.transformToFloat = function (parameter) {
                    return parseFloat(parameter.replace(",", "."));
                };

                $scope.calculateDebt = function (quantity, price) {
                    var debt = quantity * $scope.transformToFloat(price);
                    return debt;
                };

            }])

        .controller('SalesAddController', ['$scope', '$http', '$window',
            function ($scope, $http, $window) {
                $scope.customer = {
                    cpf: '',
                    customer_name: '',
                    cellphone: '',
                    telephone: '',
                    email: ''
                };

                $http({
                    method: 'GET',
                    url: 'http://localhost:3000/Customers'
                }).then(function (success) {
                    $scope.customers = success.data;
                }, function (error) {

                });

                $scope.product = {
                    product_code: '',
                    product_version: '',
                    product_name: '',
                    price: ''
                };

                $http({
                    method: 'GET',
                    url: 'http://localhost:3000/Products'
                }).then(function (success) {
                    $scope.products = success.data;
                }, function (error) {

                });

                $scope.addSale = function (sale) {
                    if (!sale.cpf) {
                        // call get customers searching by name and retrieving cpf
                        // assign cpf to scope.cpf

                        if (sale) {
                            $http({
                                method: 'POST',
                                url: 'http://localhost:3000/Sales',
                                data: sale
                            }).then(function (success) {
                                alert("Sale with Code: " + sale.sale_code + "\nwas added successfully!");
                                $window.location.href = "../views/saleslist.html";
                            }, function (error) {
                                alert(error);
                            });
                        }
                    }
                };

                $scope.sale = {
                    cpf: '',
                    product_code: '',
                    product_version: '',
                    quantity: ''
                };
            }])
})();

