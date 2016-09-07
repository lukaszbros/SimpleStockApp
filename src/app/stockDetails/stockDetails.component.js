import angular from 'angular';
import {StockDetailsController} from './stockDetails.controller';

export default angular.module('app.stockDetails', [])
  .component('stockDetails', {
    templateUrl: 'app/stockDetails/stockDetails.html',
    controller: StockDetailsController,
    controllerAs: 'stockDetails',
    bindings: {
      stock: '='
    }
  })
  .name;
