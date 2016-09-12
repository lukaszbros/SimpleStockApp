'use strict';

export function d3Graph($window, $timeout, StockGraphService) {
  'ngInject';

  return {
    restrict: 'A',
    scope: {
      data: '=',
      label: '@',
      onClick: '&'
    },
    link: function (scope, ele, attrs) {
      console.log('link');
      StockGraphService.d3().then(function (d3) {
        console.log('render');
        var renderTimeout;
        var margin = parseInt(attrs.margin) || 20,
            barHeight = parseInt(attrs.barHeight) || 20,
            barPadding = parseInt(attrs.barPadding) || 5;

        var svg = d3.select(ele[0])
            .append('svg')
            .style('width', '100%');

        $window.onresize = function () {
          scope.$apply();
        };

        scope.$watch(function () {
          return angular.element($window)[0].innerWidth;
        }, function () {
          scope.render(scope.data);
        });

        scope.$watch('data', function (newData) {
          scope.render(newData);
        }, true);

        scope.render = function (data) {
          svg.selectAll('*').remove();
          if (!data || data.length === 0) return;
          if (renderTimeout) clearTimeout(renderTimeout);

          renderTimeout = $timeout(function () {
            /*
             g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

             let parseTime = d3.timeParse("%Y-%m-%d");

             let x = d3.scaleTime().range([0, width]),
             y = d3.scaleLinear().range([height, 0]),
             z = d3.scaleOrdinal(d3.schemeCategory10);

             let line = d3.line()
             .curve(d3.curveBasis)
             .x(function(d) { return x(parseTime(Date.Parse(d.Date))); })
             .y(function(d) { return y(+d.Close); });

             svg.append(line(data[0].data));*/

            // define dimensions of graph
            let minValue = +data[0].data[0].close,
                maxValue = +data[0].data[0].close;
            angular.forEach(data[0].data, stockData => {
              if (+stockData.close < minValue) {
                minValue = +stockData.close
              }

              if (+stockData.close > maxValue) {
                maxValue = +stockData.close
              }
            });

            let margin = {top: 20, right: 20, bottom: 20, left: 20},
                width = ele[0].getBoundingClientRect().width - margin.left - margin.right,
                height = ele[0].getBoundingClientRect().height - margin.top - margin.bottom;

            var formatDate = d3.timeParse("%Y-%m-%d");
            var x = d3.scaleTime().domain([data[0].data[0].date, data[0].data[data[0].data.length-1].date]).range([0, width]);
            var y = d3.scaleLinear().domain([minValue, maxValue]).range([height, 0]);

            // Define the axes
            var xAxis = d3.axisBottom(x);
            var yAxis = d3.axisLeft(y);

            var line = d3.line()
                .x(function(d) {
                  return x(d.date);
                })
                .y(function(d) {
                  return y(d.close);
                });

            svg.append("svg:scale")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // Add the X Axis
            svg.append("g")
                .attr("class", "axis axis-x")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            // Add the Y Axis
            svg.append("g")
                .attr("class", "axis axis-y")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("fill", "#000")
                .text("Close price $");

            svg.append("svg:path")
                .datum(data[0].data)
                .attr("class", "line")
                .attr("fill", "none")
                .attr("stroke", "#000")
                .attr("d", line);
          }, 0);
        };
      });
    }
  }
}