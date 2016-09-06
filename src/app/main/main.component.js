import angular from 'angular';
import {MainController} from './main.controller';
import stockSelect from '../stockSelect/stockSelect.component.js';
import stockList from '../stockList/stockList.component.js';

export default angular.module('app.main', [stockSelect, stockList])
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController,
      controllerAs: 'main'
    })
    .name;
