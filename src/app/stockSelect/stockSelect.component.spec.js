import angular from 'angular';
import 'angular-mocks';
import stockSelect from './stockSelect.component';

describe('hello component', () => {
  beforeEach(() => {
    angular.mock.module(stockSelect);
  });
  it('should render stock select box', angular.mock.inject(($rootScope, $compile) => {
    $compile('<stock-select>Loading...</stock-select>')($rootScope);
    $rootScope.$digest();
  }));
});
