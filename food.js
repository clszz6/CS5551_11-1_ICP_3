var nutritionApp = angular.module('FoodApplication', ['ngSanitize']);
nutritionApp.controller('FoodController', function ($scope, $http) {
    $scope.submition = function (food) {
        const foodUrl = 'https://api.nutritionix.com/v1_1/search/' + food  + 
                        '?results=0:1&fields=*&appId=1906ed92&appKey=38fa2b221e690f29036f27910b865046';
        $http.get(foodUrl)
        .then(function(response) {
            console.log(response)
            angular.element(document.querySelector("#foodDisplay")).addClass("food-display");

            let foodNutrition = {
                html: "<h3>Calories</h3><br/>" + response.data.hits[0].fields.nf_calories + 
                      "<br/><br/><h3>Weight(grams)</h3><br/>" + response.data.hits[0].fields.nf_serving_weight_grams
            };

            $scope.nutrition = foodNutrition;
        })
        .catch(function() {
            $scope.nutrition = {
                html: "<h3>Error: Not a food item</h3>"
            }
        })

        $http.post('https://stream.watsonplatform.net/text-to-speech/api/v1/synthesize?username=95e4a9db-9188-45b5-9eb4-4b382df19551&password=ctpThRu8MNEs&text=' + food);
    }
});
