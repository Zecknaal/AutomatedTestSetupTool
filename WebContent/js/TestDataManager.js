/**
 * Created by Zeck on 8/11/2016.
 */
angular.module('TestDataManager', ['ngResource'])
    .service('TestDataManagerService', ['$resource', function($resource){
        this.nextID = 1;
        this.getID = function(){
            var returnID = this.nextID;
            this.nextID++;
            return returnID;
        }
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
            var param = {
                'name' : data.ParameterName,
                'value' : data.Value
            };

            return param;
        }

        this.parseTestStepData = function(data){
            var testStep = {
                'id' : this.getID( ),
                'title' : data.Name,
                //'class' : data.Class,
                'nodes' : [],
                //'params' : [],
                'object' : new TestStep(data.Name, data.Test, data.TestSet, data.Class),
                'selected': false,
            }

            // for(var paramIndex = 0; paramIndex < data.TestStepToParam.results.length; paramIndex++){
            //     testStep.params[paramIndex] = this.parseParamData(data.TestStepToParam.results[paramIndex]);
            // }

            return testStep;
        }
        this.parseTestData = function(data){
            var test = {
                'id' : this.getID( ),
                'title' : data.TestName,
                'nodes' : [],
                'object' : new Test(data.TestName, data.testSetName),
                'selected': false,
            };

            for(var testStepIndex = 0; testStepIndex < data.TestToTestStep.results.length; testStepIndex++){
                test.nodes[testStepIndex] = this.parseTestStepData(data.TestToTestStep.results[testStepIndex]);
            }

            return test;
        }

        this.parseTestSetData = function(data){
            var testSet = {
                'id' : this.getID( ),
                'title' : data.d.TestSetName,
                'nodes' : [],
                'object' : new TestSet(data.TestSetName),
                'selected': false,
            };

            for(var testIndex = 0; testIndex < data.d.TestSetToTest.results.length; testIndex++){
                testSet.nodes[testIndex] = this.parseTestData(data.d.TestSetToTest.results[testIndex]);
            }

            return [ testSet ];
        }

        this.readAllTestSetsFromURI = function(testDataManagerService, scope){
            var testSets = $resource('http://arlspmdd009.lrd.cat.com:8010/sap/opu/odata/sap/Z_AUTO_TEST_TOOL_SETUP_SRV/AutoTestSetSet(\':testSet\')?$expand=TestSetToTest/TestToTestStep/TestStepToParam', { });
            testSets.get({testSet:'Sales Order Create'},
                function(data){
                    scope.autoTestData = testDataManagerService.parseTestSetData( data );
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