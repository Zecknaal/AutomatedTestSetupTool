/**
 * Created by Zeck on 8/11/2016.
 */
function TestDataReader(){
    this.readAllTemplates = function(){
        return data = [ {test: 'Item Category Test',
            testSteps: ['Add Inventory',' Send Sales Order Create', 'Check item category'] } ,
            {test: 'Delivery Block Test',
                testSteps: ['Add Inventory', 'Send Sales Order Create', 'Check delivery block'] }]
    }
    this.read = function(testDataManagerService, scope){
        testDataManagerService.readAllTestSetsFromURI(testDataManagerService, scope);
    };

    this.getTestStepDetails = function(testStep){
        if(testStep = 'Setup Inventory')
            return ['Quantity', 'Batch', 'Product', 'Location'];
        else if(testStep = 'Create IDoc')
            return ['PRIMPSO', 'Sold-to', 'Ship-to', 'Search Alt', 'Product', 'Quantity'];
    };
}