'use strict';

export function StockService($http) {
  'ngInject';

  const StockServiceDef = {

    getStockList() {
      return $http.get('http://www.nasdaq.com/screening/companies-by-industry.aspx?exchange=NASDAQ&render=download');
    }
  };

  return StockServiceDef;
}
