(function () {

    angular.module('Sales', [])
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
            $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
        }
        ])
        .controller('SalesListController', ['$scope', '$http', '$window',
            function ($scope, $http, $window) {

                $http({
                    method: 'GET',
                    url: 'https://selloncredit.herokuapp.com/Sales'
                }).then(function (success) {
                    $scope.sales = success.data;
                }, function (error) {

                });

                $scope.removeSale = function (sale) {
                    var url = 'https://selloncredit.herokuapp.com/Sales/' + sale.customers_cpf + "/" + sale.products_product_code + "/" + sale.products_product_version;
                    $http({
                        method: 'DELETE',
                        url: url
                    }).then(function (success) {
                        var response = JSON.stringify(success);
                        if (response.indexOf("\"affectedRows\":1") > -1) {
                            alert("Sale with Product Code: " + sale.products_product_code + ",\nProduct Version: " + sale.products_product_version + "\nand Customer CPF: " + sale.customers_cpf + "\nwas deleted with success!");
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
                        var url = 'https://selloncredit.herokuapp.com/Sales/' + sale.quantity;
                        $http({
                            method: 'PUT',
                            url: url,
                            data: saleData
                        }).then(function (success) {
                            var response = JSON.stringify(success);
                            alert(response);
                            if (response.indexOf("\"affectedRows\":1") > -1) {
                                alert("Sale with Product Code: " + sale.products_product_code + ",\nProduct Version: " + sale.products_product_version + "\nand Customer CPF: " + sale.customers_cpf + "\nwas edited with success!");
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
                    url: 'https://selloncredit.herokuapp.com/Customers'
                }).then(function (success) {
                    $scope.customers = success.data;
                }, function (error) {

                });

                $scope.product = {
                    id_product: '',
                    product_code: '',
                    product_version: '',
                    product_name: '',
                    price: ''
                };

                $http({
                    method: 'GET',
                    url: 'https://selloncredit.herokuapp.com/Products'
                }).then(function (success) {
                    $scope.products = success.data;
                }, function (error) {

                });

                $scope.addSale = function (sale, customer_cpf, customer_name, product_code, product_id) {
                    $scope.sale.products_product_code = product_code;
                    $scope.sale.products_id_product = JSON.stringify(product_id);
                    $scope.sale.customers_cpf = customer_cpf;

                    if((customer_cpf || customer_name) && product_code && product_id && sale.products_product_version && sale.quantity) {
                        if (!sale.customers_cpf) {
                            // call get customers searching by name and retrieving cpf
                            // assign cpf to scope.cpf
                            var url = 'https://selloncredit.herokuapp.com/Sales/' + customer_name;
                            $http({
                                method: 'GET',
                                url: url
                            }).then(function (success) {
                                var cpfJson = JSON.stringify(success.data);
                                var pattern = new RegExp("{|}|[|]|\"", "g");
                                cpfJson = cpfJson.replace(pattern, "").split(":");
                                $scope.sale.customers_cpf = cpfJson[1].replace("]", "");
                            
                                if ($scope.sale.customers_cpf) {
                                    $http({
                                        method: 'POST',
                                        url: 'https://selloncredit.herokuapp.com/Sales',
                                        data: $scope.sale
                                    }).then(function (success) {
                                        alert("Sale with Product Code: " + sale.products_product_code + ",\nProduct Version: " + sale.products_product_version + "\nand Customer CPF: " + sale.customers_cpf + "\nwas added with success!");
                                        $window.location.href = "../views/saleslist.html";
                                    }, function (error) {
                                        alert(error);
                                    });
                                }
                            }, function (error) {
                                alert(error);
                            });
                        } else {
                            $http({
                                method: 'POST',
                                url: 'https://selloncredit.herokuapp.com/Sales',
                                data: $scope.sale
                            }).then(function (success) {
                                alert("Sale with Product Code: " + sale.products_product_code + ",\nProduct Version: " + sale.products_product_version + "\nand Customer CPF: " + sale.customers_cpf + "\nwas added with success!");
                                $window.location.href = "../views/saleslist.html";
                            }, function (error) {
                                alert(error);
                            });
                        }
                    }
                };

                $scope.sale = {
                    customers_cpf: '',
                    products_id_product: '',
                    products_product_code: '',
                    products_product_version: '',
                    quantity: ''
                };
            }])
})();

