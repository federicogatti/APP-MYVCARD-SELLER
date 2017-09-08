var promotions = [
    { name: 'Caffé', id: 0 , state: true, points: 10, description: 'Caffé gratis'},
    { name: 'Chill', id: 1, state: true, points: 5, description: 'cacca gratis'},
    { name: 'Dubstep', id: 2, state: false , points: 1, description: 'pipi gratis'},
    { name: 'Indie', id: 3, state: true , points: 3, description: 'kronk gratis'},
    { name: 'Rap', id: 4, state: false , points: 4, description: 'guillermo gratis'},
    { name: 'Cowbell', id: 5, state: true , points: 8, description: 'fede gratis'}
]

var store = {
    id: 0,
    name: "JJ Corner",
    img: "../img/ionic.png",
    description: "Birreria di alta qualità",
    category:"Pub",
}

var categories =[
    {type: "Pub", selected: true},
    {type: "Ristorante", selected: false},
    {type: "Caffetteria", selected: false},
    ]

var storeId;

angular.module('starter.controllers',['ngCordova'])


    .controller('AppCtrl', function($scope, $ionicModal, $timeout,GetSellers) {
        GetSellers.getDataID(0).then(data => {
            console.log(data.data.data[0])
        GetSellers.cachedStore = data.data.data[0];
        storeId = 0
    })

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        //$scope.loginData = {};

        // Create the login modal that we will use later
       /* $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
            $scope.modal.hide()
        };

        // Open the login modal
        $scope.login = function() {
            $scope.modal.show()
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
            console.log('Doing login', $scope.loginData)

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function() {
                $scope.closeLogin()
            }, 1000)
        }*/
    })

    .controller('LoginCtrl', function($scope, $ionicModal,$state,$location,$ionicPopup,GetSellers) {
        //$scope.store.name = ""
        $scope.login = function(name){
            console.log(name)
            var logged = false
            if(name != undefined){
            GetSellers.getData().then(data => {
                for(s in data.data.data){

                    if (data.data.data[s].name.toString().toLowerCase() === name.toString().toLowerCase()) {
                        logged = true
                        GetSellers.cachedStore = data.data.data[s]
                        storeId = data.data.data[s].id
                        $location.path('/app/scanner')
                    }
                }
            if(!logged) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Nessun utente trovato',
                    template: 'Crea un account se non sei registrato'
                });

                alertPopup.then(function (res) {
                });
            }
            })}

}
})

    .controller('PromotionsCtrl', function($scope, $ionicModal, GetSellers, Promotions, $ionicPopup) {

       /* GetSellers.getDataID(0).then(data => {
            console.log(data.data.data[0])
        GetSellers.cachedPromotions = data.data.data[0].promotions;
         })*/

        GetSellers.cachedPromotions = GetSellers.cachedStore.promotions

        $scope.$watch(function () {
                return GetSellers.cachedPromotions;
            },
            function (newValue, oldValue) {
                $scope.promotions = newValue;
            }, true);

        //$scope.promotions = promotions

        $ionicModal.fromTemplateUrl('templates/new-promotion.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.openCreate = function() {
            $scope.modal.show();
        };

        $scope.closeCreate = function() {
            $scope.modal.hide();
        };

        $scope.changeState = function (promotion) {
            Promotions.modifyPromotion(GetSellers.cachedStore.id, promotion.id, promotion.name,promotion.points,!promotion.state,promotion.description).then( data =>{
            GetSellers.getDataID(storeId).then(data => {
                console.log(data.data.data[0])
            GetSellers.cachedPromotions = data.data.data[0].promotions;})
        })
        }

        $scope.promotion = {}
        $scope.createPromotion = function () {
            var promotion = {
                name: $scope.promotion.name,
                id: Math.max.apply(Math, GetSellers.cachedPromotions.map(function (p) {
                    return p.id;})) + 1,
                state: true,
                points: $scope.promotion.points,
                description: $scope.promotion.description
            }
            console.log(promotion)
            Promotions.createPromotion(GetSellers.cachedStore.id, promotion.id, promotion.name,promotion.points,promotion.description).then( data =>{
                var alertPopup = $ionicPopup.alert({
                    title: 'Promozione creata!',
                    template: 'Promozione ' + promotion.name + ' creata con successo!'
                });
                alertPopup.then(function(res) {
                    console.log('Thank you for not eating my delicious ice cream cone');
            });
            GetSellers.getDataID(storeId).then(data => {
                console.log(data.data.data[0])
            GetSellers.cachedPromotions = data.data.data[0].promotions;})
            })
            console.log(promotions)
            $scope.closeCreate()
        }


    })

    .controller('ScannerCtrl', function($scope,$cordovaBarcodeScanner, $ionicPopup, Points, GetSellers, GetCustomer) {
       // $scope.promotions = promotions

        $scope.contactMessage = {
            text: 0
        }

       /* GetSellers.getDataID(storeId).then(data => {
            console.log(data.data.data[0])
            GetSellers.cachedStore = data.data.data[0];
        })*/

        var showPopup = function(customerId) {

            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                templateUrl: '<input type="number" ng-model="contactMessage.text">',
                title: "Accredito Punti",
                subTitle: "Inserisci il numero di punti da accreditare",
                scope: $scope,
                buttons: [{
                    text: 'Annulla',
                    onTap: function(e) {
                        $scope.result= "Operazione di accredito punti annullata"
                        //return 'cancel button'
                    }
                }, {
                    text: '<b>Accredita</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        //alert($scope.contactMessage.text)
                        //return 'ok button'
                        return $scope.contactMessage.text
                    }
                }, ]
            });
            myPopup.then(function(res) {
                Points.add(customerId, GetSellers.cachedStore.id, res).then(function successCallback(response) {
                    GetCustomer.getDataID().then(data => {

                        $scope.result = "Aggiunti "+ res + " punti all'utente " + data.data.data[0].username
                })

                }, function errorCallback(response) {
                    $scope.result= "Impossibile accreditare punti all'utente"
                });
            });
        };

        $scope.scanBarCode = function () {
            $cordovaBarcodeScanner.scan().then(function(imageData){
                var res = imageData.text.split('$');
                if (res.length == 1) {
                    showPopup(res[0]);
                }
                if (res.length == 1) {
                    showPopup(res[0]);
                }
                if (res.length == 5){
                    if(res[1] == GetSellers.cachedStore.id)
                        Points.sub(res[2],res[1],res[4]).then(data => {
                            console.log(data.data.data)
                    $scope.result = "Decrementati "+ res[4] + " punti all'utente " + res[3] + ". Punti rimasti " + data.data.data.points
                })
                else
                    $scope.result = "Impossibile attivare promozioni di altri Venditori "


                }else {
                    $scope.result = "Parametri non validi, errore scansione";
                }
            })
            
               //showPopup(0);

               /* function (result) {
                    alert("We got a barcode\n" +
                        "Result: " + result.text + "\n" +
                        "Format: " + result.format + "\n" +
                        "Cancelled: " + result.cancelled);
                    $scope.result = result
                },
                function (error) {
                    alert("Scanning failed: " + error);
                },
                {
                    preferFrontCamera : true, // iOS and Android
                    showFlipCameraButton : true, // iOS and Android
                    showTorchButton : true, // iOS and Android
                    torchOn: true, // Android, launch with the torch switched on (if available)
                    saveHistory: true, // Android, save scan history (default false)
                    prompt : "Place a barcode inside the scan area", // Android
                    resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                    formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                    orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
                    disableAnimations : true, // iOS
                    disableSuccessBeep: false // iOS
                }
            );*/
        }
    })

    .controller('PromotionsModifyCtrl', function($scope, $ionicModal, $ionicPopup, GetSellers, Promotions) {
      //  $scope.promotions = promotions

        GetSellers.getDataID(storeId).then(data => {
            console.log(data.data.data[0])
        GetSellers.cachedPromotions = data.data.data[0].promotions;
        })

        $scope.$watch(function () {
                return GetSellers.cachedPromotions;
            },
            function (newValue, oldValue) {
                $scope.promotions = newValue;
            }, true);

        var index   //l'indice dell'elemento da modificare viene calcolato nel momento dell'apertura della finestra di modidifca (openModify) e viene usato dal metodo modify()

        $ionicModal.fromTemplateUrl('templates/promotion-detail.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal
        })

        //$scope.promotion = promotions[$stateParams.promotionId]
        $scope.modify = function () {

            Promotions.modifyPromotion(GetSellers.cachedStore.id, $scope.promotion.id, $scope.promotion.name, $scope.promotion.points,$scope.promotion.state,$scope.promotion.description).then( data =>{
                GetSellers.getDataID(storeId).then(data => {console.log(data.data.data[0])
                GetSellers.cachedPromotions = data.data.data[0].promotions;})
        })
            $scope.closeModify()
        }

        $scope.openModify = function(promotion) {
            var app = JSON.parse(JSON.stringify(promotion)) //copio il conternuto del json altrimenti sarebbe passato per reference
            if(app.state)
                $scope.state = "Attiva"
            else
                $scope.state = "Non Attiva"
            $scope.promotion = app
            $scope.modal.show()
        }

        $scope.closeModify = function() {
            $scope.modal.hide()
        }

      /*  $scope.remove = function (promotion) {
            if(promotion.state) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Promozione attiva!',
                    template: 'Disattiva la promozione prima di cancellarla'
                });
                alertPopup.then(function(res) {
                    console.log('Thank you for not eating my delicious ice cream cone');
                });
            }
            else {
                var index = promotions.indexOf(promotion)
                if (index > -1)
                    promotions.splice(index, 1)
            }

        }*/
        $scope.remove = function (promotion) {
            if(promotion.state) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Promozione attiva!',
                    template: 'Disattiva la promozione prima di cancellarla'
                });
                alertPopup.then(function(res) {
                    console.log('Thank you for not eating my delicious ice cream cone');
                });
            }
            else {
                $scope.showConfirm = function() {
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Canellazione',
                        template: 'Sei sicuro di voler cancellare la promozione?'
                    });

                    confirmPopup.then(function(res) {
                        if(res) {
                            Promotions.deletePromotion(GetSellers.cachedStore, promotion.id).then(data => {
                                GetSellers.getDataID(storeId).then(data => {
                                console.log(data.data.data[0])
                            GetSellers.cachedPromotions = data.data.data[0].promotions;})
                        })
                        }
                    })
                }}}
    })

    .controller('SettingsCtrl', function($scope,$ionicModal, GetSellers) {

        GetSellers.getDataID(storeId).then(data => {
            console.log(data.data.data[0])
        GetSellers.cachedStore = data.data.data[0];
        })

        $scope.$watch(function () {
                return GetSellers.cachedStore;
            },
            function (newValue, oldValue) {
                $scope.store = newValue;
            }, true);

       // $scope.store = store

        //$scope.categories = categories

        $ionicModal.fromTemplateUrl('templates/info-modify.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        })

        $scope.closeModify = function() {
            $scope.modal.hide();
        }

        $scope.openModify = function() {
            var app = JSON.parse(JSON.stringify(store))
            $scope.store_info = app
            $scope.modal.show()
        }

        $scope.modify = function () {
            store = $scope.store_info
            $scope.store = store
            $scope.closeModify()
        }

    });
