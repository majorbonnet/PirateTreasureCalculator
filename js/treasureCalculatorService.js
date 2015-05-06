angular.module('pirates')
    .factory('treasureCalculatorService', TreasureCalculatorService);

TreasureCalculatorService.$inject = ['$http', '$q']
    
 function TreasureCalculatorService ($http, $q) {
    var cachedResults = {};
     
    return {
            getNumberOfCoins: _getNumberOfCoins
    }; 

    function _getNumberOfCoins(numberOfPirates) {
        var d = $q.defer();
        
        if (cachedResults[numberOfPirates]) {
            d.resolve(angular.copy(cachedResults[numberOfPirates]));
        }
        else {
            $http.get('http://pirate.azurewebsites.net/api/Pirate/' + numberOfPirates).success(function(data){
                var result = { numberOfPirates: numberOfPirates, numberOfCoins: data}
                cachedResults[numberOfPirates] = result;
                
                d.resolve(result);
            })
            .error(function(err) {
                d.reject(err);
            });
        }
        
        return d.promise;
    }
 }