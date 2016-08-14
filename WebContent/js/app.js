var autoTestTree = angular.module('AutoTestSetupTreeApp', ['ui.tree', 'ui.bootstrap.contextMenu', 'ui.bootstrap', 'ModalInstanceControlApp', 'TestDataManager'])

.service('ParamService', [ function() {
	this.updateParams = function(params){
		this.params = params;
	}
	this.getParams = function(){
		return this.params;
	}
}])

.service('ModalService', function(){
	this.updateNodeName = function(nodeName){
		this.nodeName = nodeName;
	}
	this.getNodeName = function(){
		return this.nodeName;
	}
})

.service('SelectedNodeService', function(){
	this.setSelectedNode = function(selectedNode){
		this.node = selectedNode;
	}
	this.getSelectedNode = function(){
		return this.node;
	}
	this.getSelectedNodeDetailHTML = function(){
		if(typeof(this.node) == 'undefined')
			return;
		return this.node.$modelValue.object.getDetailHTML();
		//return 'TestStepDetail.html';
	}
	this.getSelectedNodeChildNodes = function(){
		return this.node.$modelValue.nodes;
	}
	this.getTitle = function(){
		if(typeof(this.node) == 'undefined')
			return;
		return this.node.$modelValue.title;
	}
})

.controller('AutoTestSetupTreeController',[ '$scope', '$uibModal', 'ParamService', 'ModalService', 'SelectedNodeService', 'ModalResponseService', 'TestDataManagerService',
                                            function($scope, $uibModal, ParamService, ModalService, SelectedNodeService, ModalResponseService, TestDataManagerService){	    
	
	$scope.open = function (scope) {
    	var modalInstance = $uibModal.open({
    	      animation: $scope.animationsEnabled,
    	      //templateUrl: 'TestStepModalContent.html',
    	      templateUrl: scope.$modelValue.object.modalTemplate,
    	      controller: 'ModalInstanceCtrl',
    	      windowClass: 'app-modal-window',
    	      resolve: {
    	        items: function () {
    	          return $scope.items;
    	        }
    	      }
    	    });
    	
    	 modalInstance.closed.then(function(){
    		 //alert('Cancelled');
    	 });
    	 modalInstance.result.then(function () {
    	      //ModalService.updateNodeName(nodeName);
	     });
    }

   var testDataReader = new TestDataReader( );

   testDataReader.read(TestDataManagerService, $scope);
   
   $scope.remove = function(scope){
	   scope.remove();
   }
    
    $scope.contextMenu = function(scope){
    	$scope.updateSelectedItem(scope);
    	return scope.$modelValue.object.getContextMenu($scope);
    }
   
    $scope.addItem = function(scope){
    	ModalResponseService.setCallback($scope.addNode);
    	$scope.open(scope);
    };
    
    $scope.addNode = function(title){
    	var temp = ModalResponseService.getResponse();
	    var nodeData = SelectedNodeService.getSelectedNode().$modelValue;
        nodeData.nodes.push({
          id: nodeData.id * 10 + nodeData.nodes.length,
          title: title,
          object: ModalResponseService.getResponse(),
          nodes: [],
		  selected: false,
        });
    }
   
   $scope.updateSelectedItem = function(scope){
	   if(typeof(scope) == 'undefined')
		   return;
	   if (SelectedNodeService.getSelectedNode() == scope)
		   scope.toggle();
	   SelectedNodeService.setSelectedNode(scope);
	   scope.$modelValue.object.handleClicked(scope, ParamService);
   }

   $scope.getIcon = function(scope){
   	if(scope.collapsed == false)
   		return "glyphicon glyphicon-minus";
	   else
	   	return "glyphicon glyphicon-plus";
   }
   
   $scope.isSelectedNode = function(scope){
	   if(typeof(scope) == 'undefined' || typeof(SelectedNodeService.getSelectedNode()) == 'undefined')
		   return;
	   if(scope.$modelValue.id == SelectedNodeService.getSelectedNode().$modelValue.id)
		   return true;
	   return false;
   }
   this.currentItem = 'nothing';
}])
.controller('AutoTestSetupDetailController', [ '$scope', 'ParamService', 'SelectedNodeService', function($scope, ParamService, SelectedNodeService){
	    $scope.testSetContextMenu = [
	                                ['Add Test', function($itemScope){
	                                  alert('Add Test');
	                                }]
	   ];
	$scope.getDetailHTML = function(){
		return SelectedNodeService.getSelectedNodeDetailHTML();//'TestStepDetail.html';
	}
	
	$scope.getTitle = function(){
		return SelectedNodeService.getTitle();
	}
	$scope.getChildNodes = function(){
		return SelectedNodeService.getSelectedNodeChildNodes();
	}
    $scope.$watch(
    		function(){ return ParamService.params },
    		function(newval) { $scope.params = newval }
    		)
}]);





	