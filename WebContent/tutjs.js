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
		}
}

var autoTestTree = angular.module('AutoTestSetupTreeApp', ['ui.tree', 'ui.bootstrap.contextMenu', 'ui.bootstrap'])
   autoTestTree.controller('AutoTestSetupTreeController',[ '$scope', function($scope, $uibModal, $log){
	    $scope.testSetContextMenu = [
	                                ['Add Test', function($itemScope){
	                                  alert('Add Test');
	                                }]
   	   ];
	    
	    $scope.open = function (size) {
	    	var modalInstance = $uibModal.open({
	    	      animation: $scope.animationsEnabled,
	    	      templateUrl: 'myModalContent.html',
	    	      controller: 'ModalInstanceCtrl',
	    	      size: size,
	    	      resolve: {
	    	        items: function () {
	    	          return $scope.items;
	    	        }
	    	      }
	    	    });
	    	
	    	 modalInstance.result.then(function (selectedItem) {
	    	      $scope.selected = selectedItem;
	    	    }, function () {
	    	      $log.info('Modal dismissed at: ' + new Date());
	    	    });
	    }
	   
       var a = new TestDataReader( );

       $scope.autoTestData = a.read();
       
       $scope.loadOnClick = function(scope){
    	   scope.remove();
    	   
       }
       
       $scope.remove = function(scope){
    	   scope.remove();
    	   
       }
       $scope.buttonClick = function(scope){
    	   scope.remove();
    	   
       }
	    $scope.testContextMenu = [
	                                ['Add Test Step', function($itemScope){
	                                  alert('Add Test');
	                                }]
	   ];
	    
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
	    	var nodeData = scope.$modelValue;
	    	nodeData.title = 'Ttest';
	        nodeData.nodes.push({
	          id: nodeData.id * 10 + nodeData.nodes.length,
	          title: nodeData.title + '.' + (nodeData.nodes.length + 1),
	          nodes: []
	        });
	    };
	   $scope.updateCurrentItem = function(scope){
		   this.currentItem = scope;
	   }
	   $scope.hidden = false;
}]);

var autoTestDetail = angular.module('AutoTestSetupDetailApp', ['ui.bootstrap.contextMenu'])
	autoTestDetail.controller('AutoTestSetupDetailController',function($scope){
	    $scope.testSetContextMenu = [
	                                ['Add Test', function($itemScope){
	                                  alert('Add Test');
	                                }]
	   ];
	   
    $scope.params = ['Quantity', 'Product'];
    $scope.title = 'Parameters';
});

var modalInstanceControl = angular.module('ModalInstanceControlApp', []).controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

	  $scope.items = items;
	  $scope.selected = {
	    item: $scope.items[0]
	  };

	  $scope.ok = function () {
	    $uibModalInstance.close($scope.selected.item);
	  };

	  $scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	  };
	});

angular.element(document).ready(function() {
	angular.bootstrap(document.getElementById('AutoTestDetail'), ['AutoTestSetupDetailApp']);
	angular.bootstrap(document.getElementById('AutoTestTree'),   ['AutoTestSetupTreeApp']);
	angular.bootstrap(document.getElementById('AutoTestTreee'),   ['ModalInstanceControlApp']);
});