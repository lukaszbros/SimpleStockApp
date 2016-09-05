import angular from 'angular';
import 'angular-mocks';
import {stockSelect} from './stockSelect';

describe('hello component', () => {
  beforeEach(() => {
    angular
      .module('stockSelect', ['app/stockSelect.html'])
      .component('stockSelect', stockSelect);
    angular.mock.module('stockSelect');
  });
  it('should render hello world', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<stock-select>Loading...</stock-select>')($rootScope);
    $rootScope.$digest();
  }));
});
