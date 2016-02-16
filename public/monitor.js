var monitor = angular.module('monitor', ['frapontillo.gage', 'highcharts-ng']);

monitor.controller('temp',['$scope', '$http',
	function($scope, $http) {
		function getReadings() {
			angular.forEach($scope.sensorArray, function(sensor, index)
			{
				$http.get('/api/readings?name=' + sensor.name).
				success(function(data) {
					sensor.reading = data[data.length-1].reading;
					var sensorHistory = [];
					for(var i=0; i<data.length; i++) sensorHistory[i] = [parseInt(data[i].time), parseInt(data[i].reading)];
					sensor.chartConfig = {options: {}, xAxis: {type: 'datetime'}, series: [{name: 'Temperature', data: sensorHistory}], title: {text: sensor.title}};
				}).
				error(function(data, status) {
					console.log('error:', status);
				});
			});
			setTimeout(getReadings, 15*1000);
		}
		
		$http.get('/api/sensors?type=temp').
		success(function(data) {
			$scope.sensorArray = data;
			getReadings();
		}).
		error(function(data, status) {
			console.log('error:', status);
		});
}]);