function TestStep(testStep, test, testSet, type){
	this.testStep= testStep;
	this.test = test;
	this.testSet = testSet;
	this.type = type;
	
	var reader = new TestStepDataReader();
	this.params = reader.readData(testStep, test, testSet);
	
	this.getParams = function(){
		return this.params;
	}
}

function TestStepDataReader(){
	this.readData = function(testStep, test, testSet){
		if(testStep == 'Add Inventory'){
			return [ 'Product', 'Quantity', 'Batch', 'Location' ];
		}
		return ['Some other param'];
	}
}
function TestDataReader(){
		this.read = function(){
    	   autoTestData = 
    		   [    
		    	{
		    		'id' : 1,
		    		'title': 'Product setup testing',
		    		'nodes' : 
		    			[
		    			 	{
			    			 	'id' : 11,
			    			 	'title' : '1A1 Setup Test',
			    			 	'nodes' : [
				   		    			 	{
							    			 	'id' : 111,
							    			 	'title' : 'Add Inventory',
									    		'teststep': new TestStep('Add Inventory', '1A1 Setup Test', 'Product setup testing'),
							    			 	'nodes' : []
						    			 	},
					    			 	]
		    			 	},
   		    			 	{
			    			 	'id' : 12,
			    			 	'title' : '1A1 Add Test',
			    			 	'nodes' : []
		    			 	},
		    			 	{
			    			 	'id' : 13,
			    			 	'title' : '1A1 Subtract Test',
			    			 	'nodes' : []
		    			 	},
		    			 	{
			    			 	'id' : 14,
			    			 	'title' : '1A1 Subtract Test',
			    			 	'nodes' : []
		    			 	}
		    			]
		    	},
	            {
		    		'id' : 2,
		    		'title': 'Sales Order Create testing',
		    		'nodes' : 
		    			[
		    			]
	            },
	            {
		    		'id' : 3,
		    		'title': 'Sales Order Maintenance testing',
		    		'nodes' : 
		    			[ ]
	            }
	       ];
    	   return autoTestData;
		};
		
		this.getTestStepDetails = function(testStep){
			if(testStep = 'Setup Inventory')
				return ['Quantity', 'Batch', 'Product', 'Location'];
			else if(testStep = 'Create IDoc')
				return ['PRIMPSO', 'Sold-to', 'Ship-to', 'Search Alt', 'Product', 'Quantity'];
		};
}

var autoTestTree = angular.module('AutoTestSetupTreeApp', ['ui.tree', 'ui.bootstrap.contextMenu', 'ui.bootstrap', 'ModalInstanceControlApp'])

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
})

.controller('AutoTestSetupTreeController',[ '$scope', '$uibModal', 'ParamService', 'ModalService', 'SelectedNodeService', 'ModalResponseService',
                                            function($scope, $uibModal, ParamService, ModalService, SelectedNodeService, ModalResponseService){	    
   $scope.open = function (size) {
    	var modalInstance = $uibModal.open({
    	      animation: $scope.animationsEnabled,
    	      templateUrl: 'ModalContent.html',
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
   myStyle={'background-color':'blue !important'};
   var a = new TestDataReader( );

   $scope.autoTestData = a.read();
   
   $scope.remove = function(scope){
	   scope.remove();
   }
    
    $scope.contextMenu = function(scope){
    	SelectedNodeService.setSelectedNode(scope);
    	return [
    	        [scope.$modelValue.title,
    	         null],
    	        null,
                ['Add test step',
                 $scope.addItem],
                ['Delete test',
                 $scope.remove]
               ];
    }
   
    $scope.addItem = function(scope){
    	ModalResponseService.setCallback($scope.addNode);
    	$scope.open();
    };
    
    $scope.addNode = function(title){
	    var nodeData = SelectedNodeService.getSelectedNode().$modelValue;
        nodeData.nodes.push({
          id: nodeData.id * 10 + nodeData.nodes.length,
          title: title,
          teststep: new TestStep(title, '1A1 Setup Test', 'Product setup testing'),
          nodes: []
        });
    }
   
   $scope.updateSelectedItem = function(scope){
	   this.currentItem = scope;
	   ParamService.params = scope.$modelValue.teststep.getParams();//[scope.$modelValue.title, 'a'];
   }
   this.currentItem = 'nothing';
}])
.controller('AutoTestSetupDetailController', [ '$scope', 'ParamService', 'SelectedNodeService', function($scope, ParamService, SelectedNodeService){
	    $scope.testSetContextMenu = [
	                                ['Add Test', function($itemScope){
	                                  alert('Add Test');
	                                }]
	   ];
    //$scope.params = ['Quantity', 'Product'];
	//this.selectedNode = SelectedNodeService.getSelectedNode();
	//if(typeof this.selectedNode != 'undefined')
	//	ParamService.params = [ selectedNode.teststep.testStep ];
    $scope.$watch(
    		function(){ return ParamService.params },
    		function(newval) { $scope.params = newval }
    		)
}]);



angular.module('ModalInstanceControlApp', ['ModalResponse']).controller('ModalInstanceCtrl', [ '$scope', '$uibModalInstance', 'SelectedNodeService', 'ModalResponseService',
                                                                                function ($scope, $uibModalInstance, SelectedNodeService, ModalResponseService) {
	  $scope.ok = function () {
	    this.callback = ModalResponseService.getCallback();
	    this.callback($scope.nodeName);
	    
	    $uibModalInstance.close();
	  };

	  $scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	  };
	}]);

angular.module('ModalResponse', [])
.service('ModalResponseService', function(){
	this.setResponse = function(response){
		this.response = response;
	}
	
	this.getResponse = function(){
		return this.response;
	}
	
	this.setCallback = function(callback){
		this.callback = callback;
	}
	
	this.getCallback = function(){
		return this.callback;
	}
})