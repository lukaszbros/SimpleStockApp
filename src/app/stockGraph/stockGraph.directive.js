'use strict';
import angular from 'angular';

export function d3Graph($window, $timeout, StockGraphService) {
  'ngInject';

  return {
    restrict: 'A',
    scope: {
      data: '=',
      label: '@',
      onClick: '&'
    },
    link: (scope, ele) => {
      StockGraphService.d3().then(d3 => {
        let renderTimeout;
        const svg = d3.select(ele[0])
            .append('svg');

        $window.onresize = function () {
          scope.$apply();
        };

        scope.$watch(() => {
          return angular.element($window)[0].innerWidth;
        }, () => {
          scope.render(scope.data);
        });

        scope.$watch('data', newData => {
          scope.render(newData);
        }, true);

        scope.render = data => {
          svg.selectAll('*').remove();
          if (!data || data.length === 0) {
            return;
          }

          if (renderTimeout) {
            clearTimeout(renderTimeout);
          }

          renderTimeout = $timeout(() => {
            const margin = {top: 20, right: 20, bottom: 20, left: 40};
            const width = ele[0].getBoundingClientRect().width - margin.left - margin.right;
            const height = ele[0].getBoundingClientRect().height - margin.top - margin.bottom;
            const minDate = d3.min(data, stock => {
              return d3.min(stock.values, value => {
                return value.date;
              });
            });
            const maxDate = d3.max(data, stock => {
              return d3.max(stock.values, value => {
                return value.date;
              });
            });
            const minValue = d3.min(data, stock => {
              return d3.min(stock.values, value => {
                return value.close;
              });
            });
            const maxValue = d3.max(data, stock => {
              return d3.max(stock.values, value => {
                return value.close;
              });
            });
            const x = d3.scaleTime().domain([minDate, maxDate]).range([width, 0]);
            const y = d3.scaleLinear().domain([minValue, maxValue]).range([height, 0]);
            const z = d3.scaleOrdinal(d3.schemeCategory10).domain(data.map(stock => {
              return stock.symbol;
            }));

            // Define the axes
            const xAxis = d3.axisBottom(x)
                .tickFormat(d3.timeFormat('%m-%d'));
            const yAxis = d3.axisLeft(y)
                .tickSize(1)
                .ticks(6)
                .tickFormat(d3.format(',.2f'));

            const line = d3.line()
                .curve(d3.curveCardinal.tension(0.5))
                .x(d => {
                  return x(d.date);
                })
                .y(d => {
                  return y(d.close);
                });

            // Add the X Axis
            const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

            g.append('g')
                .attr('class', 'axis axis-x')
                .attr('transform', `translate(0, ${height})`)
                .call(xAxis);

            // Add the Y Axis
            g.append('g')
                .attr('class', 'axis axis-y')
                .call(yAxis)
                .append('text')
                .attr('transform', 'rotate(-90)')
                .attr('y', 6)
                .attr('dy', '0.71em')
                .attr('fill', '#000')
                .text('Close price $');

            const stock = g.selectAll('.stock')
                .data(data)
                .enter().append('g')
                .attr('class', 'stock');

            stock.append('path')
                .attr('class', 'line')
                .attr('fill', 'none')
                .attr('stroke', stock => {
                  return z(stock.symbol);
                })
                .attr('d', stock => {
                  return line(stock.values);
                });
          }, 0);
        };
      });
    }
  };
}
