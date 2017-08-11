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

angular.module('starter.controllers', [])


    .controller('AppCtrl', function($scope, $ionicModal, $timeout) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
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
        }
    })


    .controller('PromotionsCtrl', function($scope, $ionicModal) {
        $scope.promotions = promotions

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
            var index = promotions.indexOf(promotion)
            promotions[index].state = !promotions[index].state
            //promotions[id].state = !promotions[id].state
        }

        $scope.promotion = {}
        $scope.createPromotion = function () {
            var promotion = {
                name: $scope.promotion.name,
                id: promotions[promotions.length-1].id+1,
                state: true,
                points: $scope.promotion.points,
                description: $scope.promotion.description
            }
            promotions.push(promotion)
            console.log(promotions)
            $scope.closeCreate()
        }


    })

    .controller('ScannerCtrl', function($scope) {
        $scope.promotions = promotions
    })

    .controller('PromotionsModifyCtrl', function($scope, $ionicModal, $ionicPopup) {
        $scope.promotions = promotions
        var index   //l'indice dell'elemento da modificare viene calcolato nel momento dell'apertura della finestra di modidifca (openModify) e viene usato dal metodo modify()

        $ionicModal.fromTemplateUrl('templates/promotion-detail.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal
        })

        //$scope.promotion = promotions[$stateParams.promotionId]
        $scope.modify = function () {
            promotions[index] = $scope.promotion
            $scope.closeModify()
        }

        $scope.openModify = function(promotion) {
            var app = JSON.parse(JSON.stringify(promotion)) //copio il conternuto del json altrimenti sarebbe passato per reference
            index = promotions.indexOf(promotion)
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
                var index = promotions.indexOf(promotion)
                if (index > -1)
                    promotions.splice(index, 1)
            }

        }
    })

    .controller('SettingsCtrl', function($scope,$ionicModal) {
        $scope.store = store

        $scope.categories = categories

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
