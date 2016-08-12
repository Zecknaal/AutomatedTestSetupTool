/**
 * Created by Zeck on 8/11/2016.
 */
angular.module('TestDataManager', ['ngResource'])
    .service('TestDataManagerService', ['$resource', function($resource){
        this.getAllTestSteps = function(){
            var testStepReader = new TestStepDataReader();
            return testStepReader.readAllTemplates();
        }

        this.getAllTests = function(){
            var testReader = new TestDataReader();
            return testReader.readAllTemplates( );
        }
        this.getAutoTestData = function(){
            return this.autoTestData;
        }
        this.readAllTestSetsFromURI = function(scope){
            var testSets = $resource('http://arlspmdd009.lrd.cat.com:8010/sap/opu/odata/sap/Z_AUTO_TEST_TOOL_SETUP_SRV/AutoTestSetSet(\':testSet\')?$expand=TestSetToTest/TestToTestStep/TestStepToParam', { });
            testSets.get({testSet:'Sales Order Create'},
                function(data){
                    scope.autoTestData =
                        [
                            {
                                'id' : 1,
                                'title': 'Product setup testing',
                                'object': new TestSet('Product setup testing'),
                                'selected': false,
                                'nodes' :
                                    [
                                        {
                                            'id' : 11,
                                            'title' : '1A1 Setup Test',
                                            'object': new Test('1A1 Setup Test', 'Product setup testing'),
                                            'selected': false,
                                            'nodes' : [
                                                {
                                                    'id' : 111,
                                                    'title' : 'Add Inventory',
                                                    'object' : new TestStep('Add Inventory', '1A1 Setup Test', 'Product setup testing', 'Add Inventory'),
                                                    'selected': false,
                                                    'nodes' : []
                                                },
                                            ]
                                        },
                                        {
                                            'id' : 12,
                                            'title' : '1A1 Add Test',
                                            'object': new Test('1A1 Add Test', 'Product setup testing'),
                                            'selected': false,
                                            'nodes' : []
                                        },
                                        {
                                            'id' : 13,
                                            'title' : '1A1 Subtract Test',
                                            'object': new Test('1A1 Subtract Test', 'Product setup testing'),
                                            'selected': false,
                                            'nodes' : []
                                        },
                                        {
                                            'id' : 14,
                                            'title' : '1A1 Magic Test',
                                            'object': new Test('1A1 Magic Test', 'Product setup testing'),
                                            'selected': false,
                                            'nodes' : []
                                        }
                                    ]
                            },
                            {
                                'id' : 2,
                                'title': 'Sales Order Create testing',
                                'object': new TestSet('Sales Order Create testing'),
                                'selected': false,
                                'nodes' :
                                    [
                                    ]
                            },
                            {
                                'id' : 3,
                                'title': 'Sales Order Maintenance testing',
                                'object': new TestSet('Sales Order Maintenance testing'),
                                'selected': false,
                                'nodes' :
                                    [ ]
                            }
                        ];
                },
                function(error){
                    scope.autoTestData =
                        [
                            {
                                'id' : 1,
                                'title': 'Product setup testing',
                                'object': new TestSet('Product setup testing'),
                                'selected': false,
                                'nodes' :
                                    [
                                        {
                                            'id' : 11,
                                            'title' : '1A1 Setup Test',
                                            'object': new Test('1A1 Setup Test', 'Product setup testing'),
                                            'selected': false,
                                            'nodes' : [
                                                {
                                                    'id' : 111,
                                                    'title' : 'Add Inventory',
                                                    'object' : new TestStep('Add Inventory', '1A1 Setup Test', 'Product setup testing', 'Add Inventory'),
                                                    'selected': false,
                                                    'nodes' : []
                                                },
                                            ]
                                        },
                                        {
                                            'id' : 12,
                                            'title' : '1A1 Add Test',
                                            'object': new Test('1A1 Add Test', 'Product setup testing'),
                                            'selected': false,
                                            'nodes' : []
                                        },
                                        {
                                            'id' : 13,
                                            'title' : '1A1 Subtract Test',
                                            'object': new Test('1A1 Subtract Test', 'Product setup testing'),
                                            'selected': false,
                                            'nodes' : []
                                        },
                                        {
                                            'id' : 14,
                                            'title' : '1A1 Magic Test',
                                            'object': new Test('1A1 Magic Test', 'Product setup testing'),
                                            'selected': false,
                                            'nodes' : []
                                        }
                                    ]
                            },
                            {
                                'id' : 2,
                                'title': 'Sales Order Create testing',
                                'object': new TestSet('Sales Order Create testing'),
                                'selected': false,
                                'nodes' :
                                    [
                                    ]
                            },
                            {
                                'id' : 3,
                                'title': 'Sales Order Maintenance testing',
                                'object': new TestSet('Sales Order Maintenance testing'),
                                'selected': false,
                                'nodes' :
                                    [ ]
                            }
                        ];
                })
        }
    }])