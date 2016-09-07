import angular from 'angular';

export default angular.module('app.stockDetails', [])
  .component('stockDetails', {
    templateUrl: 'app/stockDetails/stockDetails.html',
    controllerAs: 'stockDetails',
    bindings: {
      stock: '='
    }
  })
  .name;
