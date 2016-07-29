function TestSet(testSet){
	this.testSet = testSet;
	
	this.modalTemplate = "TestSetModalContent.html";
	this.getContextMenu = function(scope){ 
							return [ 
						        ['Add test to ' + testSet,
						        scope.addItem],
						        ['Delete ' + testSet,
						        scope.remove]
					        ];
	}
	
}

function Test(test, testSet){
	this.test = test;
	this.testSet = testSet;
	
	this.modalTemplate = "TestModalContent.html";
	this.getContextMenu = function(scope){ 
		return [ 
		        ['Add test step to ' + testSet,
		        scope.addItem],
		        ['Delete ' + testSet,
		        scope.remove]
	        ];
	}
}

function TestStep(testStep, test, testSet, type){
	this.testStep= testStep;
	this.test = test;
	this.testSet = testSet;
	this.type = type;
	this.modalTemplate = "TestStepModalContent.html";
	this.getContextMenu = function(scope){ 
		return [ 
		        ['Delete ' + testSet,
		        scope.remove]
	        ];
	}
	
	var reader = new TestStepDataReader();
	this.params = reader.readParamValues(testStep, test, testSet, type);
	
	this.getParams = function(){
		return this.params;
	}
}
function TestStepTemplate(testStep){
	this.testStep= testStep;
	
	var reader = new TestStepDataReader();
	this.params = reader.readData(testStep, test, testSet);
	
	this.getParams = function(){
		return this.params;
	}
}

function TestStepDataReader(){
	this.readParamValues = function(testStep, test, testSet, type){
		if(testStep == 'Add Inventory'){
			return [ 'Product', 'Quantity', 'Batch', 'Location' ];
		}
		else if(testStep == 'Send Sales Order Create')
			return['PRIMPSO', 'Order Type', 'Product', 'Quantity'];
		return ['Some other param'];
	}
	
	this.readTemplateData = function(testStep){
		
	}
	
	this.readAllTemplates = function(){
		//Do a URI read on templates here
		// ....
		data = [ { testStep: 'Add Inventory',
		           params: ['Product', 'Quantity', 'Batch', 'Location' ] },
		         { testStep: 'Send Sales Order Create',
		           params: ['Sold-to', 'Ship-to', 'Product', 'Quantity'] } ];
		
		return data;
/*		for(templateIndex = 0; templateIndex < data.length; ++templateIndex){
			testStep = new TestStepTemplate(data[templateIndex].testStep);
			testStep.params = data[templateIndex].params;
			
		}*/
		
	}
}
function TestDataReader(){
		this.read = function(){
    	   autoTestData = 
    		   [    
		    	{
		    		'id' : 1,
		    		'title': 'Product setup testing',
		    		'object': new TestSet('Product setup testing'),
		    		'nodes' : 
		    			[
		    			 	{
			    			 	'id' : 11,
			    			 	'title' : '1A1 Setup Test',
			    			 	'object': new Test('1A1 Setup Test', 'Product setup testing'),
			    			 	'nodes' : [
				   		    			 	{
							    			 	'id' : 111,
							    			 	'title' : 'Add Inventory',
							    			 	'object' : new TestStep('Add Inventory', '1A1 Setup Test', 'Product setup testing'),
							    			 	'nodes' : []
						    			 	},
					    			 	]
		    			 	},
   		    			 	{
			    			 	'id' : 12,
			    			 	'title' : '1A1 Add Test',
			    			 	'object': new Test('1A1 Add Test', 'Product setup testing'),
			    			 	'nodes' : []
		    			 	},
		    			 	{
			    			 	'id' : 13,
			    			 	'title' : '1A1 Subtract Test',
			    			 	'object': new Test('1A1 Subtract Test', 'Product setup testing'),
			    			 	'nodes' : []
		    			 	},
		    			 	{
			    			 	'id' : 14,
			    			 	'title' : '1A1 Magic Test',
			    			 	'object': new Test('1A1 Magic Test', 'Product setup testing'),
			    			 	'nodes' : []
		    			 	}
		    			]
		    	},
	            {
		    		'id' : 2,
		    		'title': 'Sales Order Create testing',
		    		'object': new TestSet('Sales Order Create testing'),
		    		'nodes' : 
		    			[
		    			]
	            },
	            {
		    		'id' : 3,
		    		'title': 'Sales Order Maintenance testing',
		    		'object': new TestSet('Sales Order Maintenance testing'),
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
   myStyle={'background-color':'blue !important'};
   var a = new TestDataReader( );

   $scope.autoTestData = a.read();
   
   $scope.remove = function(scope){
	   scope.remove();
   }
    
    $scope.contextMenu = function(scope){
    	SelectedNodeService.setSelectedNode(scope);
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
          nodes: []
        });
    }
   
   $scope.updateSelectedItem = function(scope){
	   this.currentItem = scope;
	   ParamService.params = scope.$modelValue.object.getParams();
   }
   this.currentItem = 'nothing';
}])
.controller('AutoTestSetupDetailController', [ '$scope', 'ParamService', 'SelectedNodeService', function($scope, ParamService, SelectedNodeService){
	    $scope.testSetContextMenu = [
	                                ['Add Test', function($itemScope){
	                                  alert('Add Test');
	                                }]
	   ];
    $scope.$watch(
    		function(){ return ParamService.params },
    		function(newval) { $scope.params = newval }
    		)
}]);



angular.module('ModalInstanceControlApp', ['ModalResponse', 'TestDataManager']).controller('ModalInstanceCtrl', [ '$scope', '$uibModalInstance', 'SelectedNodeService', 'ModalResponseService', 'TestDataManagerService',
                                                                                function ($scope, $uibModalInstance, SelectedNodeService, ModalResponseService, TestDataManagerService) {
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
	    $uibModalInstance.dismiss('cancel');
	  };
	  $scope.setTestStepResponse = function(){
		  ModalResponseService.setResponse( new TestStep($scope.nodeName, 'Test', 'TestSet', $scope.modalSelectedNode) );
	  }
	  $scope.testSteps = TestDataManagerService.getAllTestSteps();
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
});

angular.module('TestDataManager', [])
	.service('TestDataManagerService', function(){
		this.getAllTestSteps = function(){
			var testStepReader = new TestStepDataReader();
			return testStepReader.readAllTemplates();
		}
	})