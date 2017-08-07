var promotions = [
    { name: 'Caffé', id: 0 , state: true, points: 10, description: 'Caffé gratis'},
    { name: 'Chill', id: 1, state: true, points: 5, description: 'cacca gratis'},
    { name: 'Dubstep', id: 2, state: false , points: 1, description: 'pipi gratis'},
    { name: 'Indie', id: 3, state: true , points: 3, description: 'kronk gratis'},
    { name: 'Rap', id: 4, state: false , points: 4, description: 'guillermo gratis'},
    { name: 'Cowbell', id: 5, state: true , points: 8, description: 'fede gratis'}
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
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function() {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function() {
                $scope.closeLogin();
            }, 1000);
        };
    })

    .controller('PlaylistsCtrl', function($scope) {
        $scope.promotions = promotions
    })

    .controller('PromotionsCtrl', function($scope, $ionicModal) {
        $scope.promotions = promotions

        $ionicModal.fromTemplateUrl('templates/new-promotion.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.login = function() {
            $scope.modal.show();
        };

        $scope.closeLogin = function() {
            $scope.modal.hide();
        };

        $scope.changeState = function (id) {
            promotions[id].state = !promotions[id].state
        }

        $scope.promotion = {}
        $scope.createPromotion = function () {
            var promotion = {
                name: $scope.promotion.name,
                id: promotions.length,
                state: true,
                points: $scope.promotion.points,
                description: $scope.promotion.description
            }
            promotions.push(promotion)
            $scope.closeLogin()
        }


    })

    .controller('ScannerCtrl', function($scope) {
        $scope.promotions = promotions
    })

    .controller('PromotionDetailCtrl', function($scope,$stateParams) {
        $scope.promotion = promotions[$stateParams.promotionId]
        $scope.modify = function () {
            promotions[$stateParams.promotionId] = $scope.promotion
        }

    })

    .controller('PromotionsModifyCtrl', function($scope,$stateParams) {
        $scope.promotions = promotions


    })

    .controller('PlaylistCtrl', function($scope, $stateParams) {
    });
