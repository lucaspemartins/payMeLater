(function () {

    angular.module('Products', [])
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        }
        ])
        .controller('ProductsListController', ['$scope', '$http', '$window',
            function ($scope, $http, $window) {

                $http({
                    method: 'GET',
                    url: 'http://localhost:3000/Products'
                }).then(function (success) {
                    $scope.products = success.data;
                }, function (error) {

                });

                $scope.removeProduct = function (code) {
                    var url = 'http://localhost:3000/Products/' + code;
                    $http({
                        method: 'DELETE',
                        url: url
                    }).then(function (success) {
                        var response = JSON.stringify(success);
                        if (response.indexOf("\"affectedRows\":1") > -1) {
                            alert("Product with Code: " + code + "\nwas deleted with success!");
                        }
                        else {
                            alert("Product cannot be deleted!\n" + response);
                        }
                        $window.location.reload();
                    }, function (error) {
                        alert(error);
                    });
                };

                $scope.callEditModal = function (product) {
                    $scope.product = product;
                };

                $scope.product = {
                    product_code: '',
                    product_version: '',
                    product_name: '',
                    price: ''
                };

                $scope.editProduct = function (product) {

                    if (product.product_code && product.product_version) {
                        var MAX_REQUESTS = 3,
                            retries = 0;

                        function doQuery() {
                            var url = 'http://localhost:3000/Products/' + product.product_code;
                            $http({
                                method: 'PUT',
                                url: url,
                                data: product
                            }).then(function (success) {
                                var response = JSON.stringify(success);
                                alert(response);
                                if (response.indexOf("\"affectedRows\":1") > -1) {
                                    alert("Product with Code: " + product.product_code + "\nwas edited successfully!");
                                }
                                else {
                                    alert("Product cannot be edited!\n\n" + response);
                                }
                            }, function (error) {
                                if (error.status <= 0 && retries < MAX_REQUESTS) {
                                    doQuery();
                                    retries++;
                                }
                                else {
                                    alert(JSON.stringify(error));
                                }
                            });
                            
                        }
                        $window.location.reload();
                    }
                };

                $scope.refreshPage = function () {
                    $window.location.reload();
                };

            }])

        .controller('ProductsAddController', ['$scope', '$http', '$window',
            function ($scope, $http, $window) {

                $scope.addProduct = function (product) {
                    if (product.product_code && product.product_version) {
                        $http({
                            method: 'POST',
                            url: 'http://localhost:3000/Products',
                            data: product
                        }).then(function (success) {
                            alert("Product with Code: " + product.product_code + "\nwas added successfully!");
                            $window.location.href = "../views/productslist.html";
                        }, function (error) {
                            alert(error);
                        });
                    }
                };

                $scope.product = {
                    product_code: '',
                    product_version: '',
                    product_name: '',
                    price: ''
                };
            }])
})();

