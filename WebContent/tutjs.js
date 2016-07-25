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
							    			 	'title' : 'Create product 1A1',
									    		'hexcore': 'gunblade',
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

var autoTestTree = angular.module('AutoTestSetupTreeApp', ['ui.tree', 'ui.bootstrap.contextMenu', 'ui.bootstrap', 'ModalInstanceControlApp']);

   autoTestTree.controller('AutoTestSetupTreeController',[ '$scope', '$uibModal', function($scope, $uibModal, $log){	    
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
	    		 alert('Cancelled');
	    	 });
	    	 modalInstance.result.then(function (selectedItem) {
	    	      alert(selectedItem);
    	     });
	    }
	   
       var a = new TestDataReader( );

       $scope.autoTestData = a.read();
       
       $scope.remove = function(scope){
    	   scope.remove();
       }
	    
	    $scope.contextMenu = function(scope){
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
	    	$scope.open();
/*	    	var nodeData = scope.$modelValue;
	    	nodeData.title = 'Ttest';
	        nodeData.nodes.push({
	          id: nodeData.id * 10 + nodeData.nodes.length,
	          title: nodeData.title + '.' + (nodeData.nodes.length + 1),
	          nodes: []
	        });*/
	    };
	   $scope.updateCurrentItem = function(scope){
		   this.currentItem = scope;
	   }
	   this.currentItem = 'nothing';
}]);

autoTestTree.service('testservice', function() {
    this.myFunc = function () {
        return autoTestTree.currentItem;
    }
});

var autoTestDetail = angular.module('AutoTestSetupDetailApp', ['ui.bootstrap.contextMenu', 'AutoTestSetupTreeApp'])
	autoTestDetail.controller('AutoTestSetupDetailController',function($scope, testservice){
	    $scope.testSetContextMenu = [
	                                ['Add Test', function($itemScope){
	                                  alert('Add Test');
	                                }]
	   ];
	   
    $scope.params = ['Quantity', 'Product'];
    $scope.title = testservice.myFunc( );
});

angular.module('ModalInstanceControlApp', []).controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

	  $scope.items = items;
	  $scope.selected = {
	    //item: 'item'//$scope.items[0]
	  };

	  $scope.ok = function () {
	    $uibModalInstance.close($scope.nodeName);
	    this.nodeName = $scope.nodeName;
	  };

	  $scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	  };
	});

angular.element(document).ready(function() {
	angular.bootstrap(document.getElementById('AutoTestDetail'), ['AutoTestSetupDetailApp']);
});