'use strict';
import * as d3 from 'd3';

export function StockGraphService($rootScope, $timeout, $q) {
  'ngInject';

  const d = $q.defer();
  $timeout(() => {
    $rootScope.$apply(() => {
      d.resolve(d3);
    });
  }, 0);

  return {
    d3() {
      return d.promise;
    },

    stockInfoHtml(stock, color) {
      const rows =
          `<tr>
            <td class="key">Date:</td>
            <td class="x-value"><strong>${stock.date.toISOString().slice(0, -14)}</strong></td>
          </tr>
           <tr>
            <td class="key">Open:</td>
            <td class="x-value"><strong>$${(stock.open ? stock.open.toFixed(2) : 0)}</strong></td>
          </tr>
          <tr>
            <td class="key">Close:</td>
            <td class="x-value"><strong>$${(stock.close ? stock.close.toFixed(2) : 0)}</strong></td>
          </tr>
          <tr>
            <td class="key">High:</td>
            <td class="x-value"><strong>$${(stock.high ? stock.high.toFixed(2) : 0)}</strong></td>
          </tr>
          <tr>
            <td class="key">Low:</td>
            <td class="x-value"><strong>$${(stock.low ? stock.low.toFixed(2) : 0)}</strong></td>
          </tr>
          <tr>
            <td class="key">Volume:</td>
            <td class="x-value"><strong>${(stock.volume ? stock.volume : 0)}</strong></td>
          </tr>`;

      const header =
          `<thead>
            <tr>
              <td class="legend-color-guide"><div style="background-color: ${color};"></div></td>
              <td class="key"><strong>${stock.symbol}</strong></td>
            </tr>
          </thead>`;

      return `<table>
            ${header}
            <tbody>
             ${rows}
            </tbody>
          </table>`;
    }
  };
}
