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
    })

;