/**
 * Created by Zeck on 8/11/2016.
 */
function Test(test, testSet){
    this.test = test;
    this.testSet = testSet;

    this.modalTemplate = "TestModalContent.html";
    this.getContextMenu = function(scope){
        return [
            ['Add test step to ' + test,
                scope.addItem],
            ['Delete ' + test,
                scope.remove]
        ];
    }

    this.getKey = function(){
        return { testSet: this.testSet, test: this.test};
    }

    this.getDetailHTML = function(){
        return 'views/TestDetail.html';
    }

    this.handleClicked = function(scope){

    }
}