/**
 * Created by Zeck on 8/11/2016.
 */
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

    this.getKey = function(){
        return { testSet: this.testSet};
    }

    this.getDetailHTML = function(){
        return 'views/TestSetDetail.html';
    }

    this.handleClicked = function(scope){

    }
}