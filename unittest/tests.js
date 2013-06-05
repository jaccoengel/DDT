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
            var testValue = "testValue";
            check.define("testGlobal" , testValue);
            equal(check.global.testGlobal , testValue);
        })
    }
    
};