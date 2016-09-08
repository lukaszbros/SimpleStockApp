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
      StockGraphService.d3().then(function (d3) {

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
            let margin = {top: 20, right: 80, bottom: 30, left: 50},
              width = ele[0].getBoundingClientRect().width - margin.left - margin.right,
              height = ele[0].getBoundingClientRect().height - margin.top - margin.bottom;

            var x = d3.scaleTime().domain([0, 30]).range([0, width]);
            var y = d3.scaleLinear().domain([0, 50]).range([height, 0]);
            var formatDate = d3.timeParse("%Y-%m-%d");
            // create a line function that can convert data[] into x and y points
            var line = d3.line()
            // assign the X function to plot our line as we wish
                .x(function(d,i) {
                  return x(i);
                })
                .y(function(d) {
                  return y(+d.Close);
                });

            // Add an SVG element with the desired dimensions and margin.
            svg.append("svg:svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom);

            // Add the line by appending an svg:path element with the data line we created above
            // do this AFTER the axes above so that the line is above the tick-lines
            svg.append("svg:path").attr("d", line(data[0].data));
          }, 0);
        };
      });
    }
  }
}