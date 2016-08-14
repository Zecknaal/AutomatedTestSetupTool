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

        this.parseParamData = function(data){
            var params;
            for(var paramIndex = 0; paramIndex < data.d.TestToTestStep.results.length(); paramIndex++){
                params[paramIndex] = {
                    'name' : data.ParameterName,
                    'value' : data.Value
                }
            }

            return params;
        }

        this.parseTestStepData = function(data){
            var testStep = {
                'id' : 3,
                'title' : data.Name,
                'class' : data.Class
            }

            for(var paramIndex = 0; paramIndex < data.d.TestToTestStep.results.length(); paramIndex++){
                testStep.nodes[paramIndex] = parseTestStepData(data.d.TestToTestStep.results[paramIndex]);
            }

            return testStep;
        }
        this.parseTestData = function(data){
            var test = {
                'id' : 2,
                'title' : data.TestName
            };

            for(var testStepIndex = 0; testStepIndex < data.d.TestToTestStep.results.length(); testStepIndex++){
                test.nodes[testStepIndex] = parseTestStepData(data.d.TestToTestStep.results[testStepIndex]);
            }

            return test;
        }

        this.parseTestSetData = function(data){
            var testSet = {
                'id' : 1,
                'title' : data.d.TestSetName
            };

            for(var testIndex = 0; testIndex < data.d.TestSetToTest.results.length(); testIndex++){
                testSet.nodes[testIndex] = parseTestData(data.d.TestSetToTest.results[testIndex]);
            }

            return testSet;
        }

        this.readAllTestSetsFromURI = function(scope){
            var testSets = $resource('http://arlspmdd009.lrd.cat.com:8010/sap/opu/odata/sap/Z_AUTO_TEST_TOOL_SETUP_SRV/AutoTestSetSet(\':testSet\')?$expand=TestSetToTest/TestToTestStep/TestStepToParam', { });
            testSets.get({testSet:'Sales Order Create'},
                function(data){
                    scope.autoTestData = parseTestSetData(data);
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