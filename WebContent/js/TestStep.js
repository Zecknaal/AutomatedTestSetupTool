/**
 * Created by Zeck on 8/11/2016.
 */
function TestStep(testStep, test, testSet, type){
    this.testStep= testStep;
    this.test = test;
    this.testSet = testSet;
    this.type = type;
    this.modalTemplate = "TestStepModalContent.html";
    this.getContextMenu = function(scope){
        return [
            ['Delete ' + testStep,
                scope.remove]
        ];
    }

    this.getKey = function(){
        return { testSet: this.testSet, test: this.test, testStep: this.testStep};
    }

    var reader = new TestStepDataReader();
    this.params = reader.readParamValues(testStep, test, testSet, type);

    this.getParams = function(){
        return this.params;
    }

    this.getDetailHTML = function(){
        return 'views/TestStepDetail.html';
    }

    this.handleClicked = function(scope, ParamService){
        ParamService.params = scope.$modelValue.object.getParams();
    }
}