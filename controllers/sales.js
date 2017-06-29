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
                    sale_code: '',
                    sale_version: '',
                    sale_name: '',
                    price: ''
                };

                $scope.editSale = function (sale) {

                    if (sale.sale_code && sale.sale_version) {
                        var MAX_REQUESTS = 3,
                            retries = 0;

                        function doQuery() {
                            var url = 'http://localhost:3000/Sales/' + sale.sale_code;
                            $http({
                                method: 'PUT',
                                url: url,
                                data: sale
                            }).then(function (success) {
                                var response = JSON.stringify(success);
                                alert(response);
                                if (response.indexOf("\"affectedRows\":1") > -1) {
                                    alert("Sale with Code: " + sale.sale_code + "\nwas edited successfully!");
                                }
                                else {
                                    alert("Sale cannot be edited!\n\n" + response);
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

        .controller('SalesAddController', ['$scope', '$http', '$window',
            function ($scope, $http, $window) {

                $scope.addSale = function (sale) {
                    if (sale.sale_code && sale.sale_version) {
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
                };

                $scope.sale = {
                    sale_code: '',
                    sale_version: '',
                    sale_name: '',
                    price: ''
                };
            }])
})();

