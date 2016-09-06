import angular from 'angular';
import StockService from './common.stock.service';

export default angular.module('app.common', [])
  .factory(StockService)
  .name;
