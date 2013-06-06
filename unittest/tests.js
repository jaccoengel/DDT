var myTests = {
    
    setup : function()
    {
        QUnit.reset();  // should clear the DOM
        QUnit.init();   // resets the qunit test environment
        QUnit.start();  // allows for the new test to be captured.
    } ,
    
    runOptionsTests : function(){

        test("Configuration" , function(){
            equal(isNaN(options.associationMargin),false);
            equal(isNaN(options.minOffsetLeft),false);
            equal(isNaN(options.minDimentions.width),false);
            equal(isNaN(options.minDimentions.height),false);
            bigger($.inArray(options.dimentionTrigger , Array("or" , "and")) , -1);
            equal(typeof(options.removeableIds) , "object");
            equal(typeof(options.errorsOnly) , "boolean");
        });

    } ,
    
    runCalculationTests : function()
    {   
        test("Array prototyping" , function(){
            testArray = Array(1,2,3) ;
            equal(testArray.minimum() , 1) ;
            equal(testArray.maximum() , 3) ;
        });
        
        test("Calculate offsets" , function(){
            equal(calculate.left("#qunit") , 8) ;
            equal(calculate.top("#qunit") , 8) ;
        });
        
        test("Group offsets" , function(){
            var testArray = Array( 1 , 2 , 50 , 51 , 101 , 102);
            var resultArray = Array(1 , 50 , 101);
            deepEqual(calculate.getOffsetValues(testArray) , resultArray);
            equal(calculate.isThere(103 , 4 , testArray) , 4);
            equal(calculate.isThere(130 , 4 , testArray) , false);
        });
        
        test("Element requirements" , function(){
            equal(calculate.meetsMinimumSize("#qunit") , true);
            tmpDimentionTrigger = options.dimentionTrigger ;
            options.minDimentions.width = 1600;
            options.minDimentions.height = 2000;
            equal(calculate.meetsMinimumSize("#qunit") , false);
            options.dimentionTrigger = "or";
            equal(calculate.meetsMinimumSize("#qunit") , true);
        });
        
        test("Element positioning" , function(){
            var nodeObject = Array($("#qunit-header") , $("#qunit-testresult") , $("#qunit-tests"))
            var expectedHresults = Array(55,99);
            var expectedVresults = Array(0,0);
            deepEqual(calculate.errors("h" , nodeObject) , expectedHresults) ;
            nodeObject = Array($("#qunit-header") , $("#qunit-testresult") , $("#qunit-tests"));
            deepEqual(calculate.errors("v" , nodeObject) , expectedVresults) ;
        });
        
    } ,
    
    runCheckTests : function(){
        test("Setting globals" , function(){
            /* Test preperations */
            var testValue = "testValue";
            check.define("testGlobal" , testValue);
            
            /* Tests */
            equal(check.global.testGlobal , testValue);
        });
        
        test("Preparing elements" , function(){
            /* Test preperations */
            options.removeableIds = Array("removableElement") ;
            
            /* Tests */
            equal(check.removeElements() , 1);
        });
        
        test("Checking fills" , function(){
            /* Test preperations */
            var testAllNodes = check.getAllNodes(document.getElementById("nodeCount"));
            
            /* Tests */
            equal(testAllNodes.length , 9);
            equal(check.fillLeftArray(testAllNodes).length , 3) ;
            equal(check.fillLeftArray(testAllNodes)[0].length , 2) ;
            equal(check.fillLeftArray(testAllNodes)[1].length , 2) ;
            equal(check.fillLeftArray(testAllNodes)[2].length , 5) ;
            equal(check.fillTopArray(testAllNodes).length , 2) ;
            equal(check.fillTopArray(testAllNodes)[0].length , 1) ;
            equal(check.fillTopArray(testAllNodes)[1].length , 8) ;
        });
        
        test("Detecting design anomaly" , function(){
            var testAllNodes = check.fillLeftArray(check.getAllNodes(document.getElementById("nodeCount")));
            equal(check.checkLeft(testAllNodes) , 2);
            equal(check.checkTop(testAllNodes) , 1);
        });
    } ,
    
    runPrototypeTest : function() {
        test("Array extensions" , function(){
            var testArray = Array(1,5,9,14,19);
            equal(testArray.minimum() , 1);
            equal(testArray.maximum() , 19);
            equal(testArray.oneValue() , false);
            testArray = Array(10,10,10,10);
            equal(testArray.oneValue() , true);
        })
    }
    
};