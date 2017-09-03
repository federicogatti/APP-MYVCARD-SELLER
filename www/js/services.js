angular.module('starter.services', [])

    .service('GetSellers', function($http) {
        this.getData = function() {
            return $http({
                method: 'GET',
                url: 'http://52.166.118.153:3000/seller/',
            }).success(function(data){
                return data.data;
            }).error(function(){
                alert("Errore nello scaricare i dati dei negozi");
                return null ;
            });
        }

        this.getDataID = function(storeId) {
            return $http({
                method: 'GET',
                url: 'http://52.166.118.153:3000/seller/1',
            }).success(function(data){
                // console.log(data)
                return data.data;
            }).error(function(){
                alert("Errore nello scaricare i dati dei negozi");
                return null ;
            });
        }

        /*this.getDataByID = function(storeId, stores) {
          for (var i = 0; i < stores.length; i++) {
            if (stores[i].id === parseInt(storeId)) {
              return stores[i];
            }
          }
          return null;
        },*/
        this.cachedStores = [];
        this.cachedStore;
        this.cachedPromotions = [];
    })


    .service('Promotions', function($http) {

        this.createPromotion = function () {
            $http.post('http://52.166.118.153:3000/seller/promotion', json)
                .success(function (data) {
                    return  data
                })
                .error(function () {
                    alert("Errore nello scaricare i dati dei negozi")
                    return null
                });
        }

    })

    .service('Points', function($http) {

        this.add = function (customerId,sellerId,points) {
            var json = JSON.stringify({
                points: points
            })
           return $http.put('http://52.166.118.153:3000/customer/points/add/' + customerId + '/' + sellerId, json)
                .success(function (data) {
                    console.log(data.data)
                    return  data.data
                })
                .error(function () {
                    alert("Errore nello scaricare i dati dei negozi")
                    return null
                });
        }

        this.sub = function (customerId,sellerId,points) {
            var json = JSON.stringify({
                points: points
            })
            $http.put('http://52.166.118.153:3000/customer/points/sub/' + customerId + '/' + sellerId, json)
                .success(function (data) {
                    return  data
                })
                .error(function () {
                    alert("Errore nello scaricare i dati dei negozi")
                    return null
                });
        }

    })

    .service('GetCustomer', function($http) {

        this.getDataID = function(storeId) {
            return $http({
                method: 'GET',
                url: 'http://52.166.118.153:3000/customer/0',
            }).success(function(data){
                // console.log(data)
                return data.data;
            }).error(function(){
                alert("Errore nello scaricare i dati dell'utente");
                return null ;
            });
        }

        this.getPoint = function (id) {
            console.log(this.cachedUser)
            for(var i = 0; i < this.cachedUser.points.length; i++) {
                if (this.cachedUser.points[i].sellerId === id) {
                    return this.cachedUser.points[i].points
                }
            }
        }

        //this.cachedUser = [];
        this.cachedUser;
    })
;