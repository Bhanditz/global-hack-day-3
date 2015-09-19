(function (angular) {
  angular.module('DMM')
    .controller('ContainersCtrl', ['$scope', 'Containers', 'AppConfig', function ($scope, Containers, AppConfig) {
      $scope.refresh = function () {
        Containers.query({
          all: AppConfig.showAll + 0
        }, function (data) {
          $scope.containers = data;
          $scope.$broadcast('scroll.refreshComplete');
        }, angular.noop);
      };

      $scope.isUp = function (container) {
        return container.Status.startsWith('Up');
      };

      $scope.stopContainer = function (container) {
        Containers.stop({
          id: container.Id
        }, function () {
          $scope.refresh();
        }, angular.noop);
      };

      $scope.startContainer = function (container) {
        Containers.start({
          id: container.Id
        }, function () {
          $scope.refresh();
        }, angular.noop);
      };
      $scope.refresh();
    }]);
})(angular);
