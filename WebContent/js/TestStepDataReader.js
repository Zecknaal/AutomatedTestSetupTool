/**
 * Created by Zeck on 8/11/2016.
 */

function TestStepDataReader(){
    this.readParamValues = function(testStep, test, testSet, type){
        if(type == 'Add Inventory'){
            return [ 'Product', 'Quantity', 'Batch', 'Location' ];
        }
        else if(type == 'Send Sales Order Create')
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