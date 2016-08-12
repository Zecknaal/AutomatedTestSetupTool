/**
 * Created by Zeck on 8/11/2016.
 */
function TestStepTemplate(testStep){
    this.testStep= testStep;

    var reader = new TestStepDataReader();
    this.params = reader.readData(testStep, test, testSet);

    this.getParams = function(){
        return this.params;
    }
}