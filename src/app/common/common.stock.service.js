'use strict';

export function StockService($http) {
  'ngInject';

  const StockServiceDef = {

    getStockList() {
      return $http.get('/app/common/stocks.json');
    }
  };

  return StockServiceDef;
}
