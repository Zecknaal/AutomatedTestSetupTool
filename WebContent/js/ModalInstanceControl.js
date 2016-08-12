/**
 * Created by Zeck on 8/11/2016.
 */

angular.module('ModalInstanceControlApp', ['ModalResponse', 'TestDataManager']).controller('ModalInstanceCtrl', [ '$scope', '$uibModalInstance', 'SelectedNodeService', 'ModalResponseService', 'TestDataManagerService',
    function ($scope, $uibModalInstance,  SelectedNodeService, ModalResponseService, TestDataManagerService) {
        $scope.modalSelectedNode='Please select nodee';

        $scope.ok = function () {
            this.callback = ModalResponseService.getCallback();
            this.callback($scope.nodeName);

            $uibModalInstance.close();
        };


        $scope.setButton = function(selection){
            $scope.modalSelectedNode = selection.testStep;
        }
        $scope.cancel = function () {
            TestDataManagerService.readAllTestSetsFromURI( );
            $uibModalInstance.dismiss('cancel');
        };
        $scope.setTestStepResponse = function(){
            ModalResponseService.setResponse( new TestStep($scope.nodeName, 'Test', 'TestSet', $scope.modalSelectedNode) );
        }
        $scope.setTestResponse = function(){
            ModalResponseService.setResponse( new Test($scope.nodeName, 'TestSet') );
        }

        $scope.getTestSteps = function(){
            return TestDataManagerService.getAllTestSteps();
        }
        $scope.testSteps = TestDataManagerService.getAllTestSteps();
        $scope.tests = TestDataManagerService.getAllTests();
    }]);