var builder = {

    /*
     * Checks if jQuery is allready loaded on the page
     * Checks the default jQuery vars : $ & jQuery
     * If both of them do not exsist include jQuery
     * Then load the rest of the scripts
     **/

    rootPath : false,
    unitTest : false,

    initialize : function (rootPath, unitTesting) {
        this.unitTest = unitTesting;
        this.rootPath = rootPath;
        var p = new Date();
        if (typeof ($) === "undefined" && typeof (jQuery) === "undefined") {
            var myJquery = document.createElement("script");
            myJquery.src = "http://code.jquery.com/jquery-1.9.1.js?busted=" + p.getTime();
            myJquery.type = "text/javascript";
            document.getElementsByTagName("head")[0].appendChild(myJquery);
            myJquery.addEventListener("load", function () {
                if (builder.unitTest === true) {
                    builder.initUnitTest();
                } else {
                    builder.initChecks();
                }
            }, false);
        } else {
            if (typeof (jQuery) !== "undefined") {
                $ = jQuery;
            }
            if (builder.unitTest === true) {
                builder.initUnitTest();
            } else {
                builder.initChecks();
            }
        }
    },

    /*
     * Loads all the scripts required to check design (with the exception of jQuery)
     * Initializes check after all the scripts have loaded
     **/

    initUnitTest : function () {
        $("<link/>", {
            rel: "stylesheet",
            type: "text/css",
            href: "http://code.jquery.com/qunit/qunit-1.11.0.css"
        }).appendTo("head");

        var scriptArr = new Array[
            "check.js",
            "options.js",
            "calculate.js",
            "prototyping.js",
            "canvas.js",
            "unittest/qunit.js",
            "unittest/tests.js"
        ];
        builder.loadScripts(scriptArr);
    },

    initChecks : function()
    {
       var scriptArr = Array(
            "check.js" ,
            "options.js" ,
            "calculate.js" ,
            "prototyping.js" ,
            "canvas.js"
        ); 
        builder.loadScripts(scriptArr) ;
    } ,

    loadScripts : function(scriptArr)
    {
        var loadingScripts = 0;
        for (script in scriptArr)
        {
            loadingScripts = loadingScripts + 1 ;

            if(typeof(scriptArr[script]) !== "function")
            {
                $.getScript(this.rootPath + scriptArr[script] + "?busted=" + p.getTime() ,
                    function()
                    {
                        loadingScripts = loadingScripts - 1 ;
                    }
                );
            }
        }
        
        loadInterval = setInterval(function(){
            if(loadingScripts === 0)
            {
                clearInterval(loadInterval) ;
                if(builder.unitTest === true)
                {
                    builder.startUnitTest();
                }
                else
                {
                    builder.startCheck();
                }
            }
        } , 200) ;
    },

    /*
     * Sets minimum offsetLeft to use
     * Builds canvas for error display and element highlighting
     * Starts the check setup
     **/

    startCheck : function()
    {
        options.setLeft() ;
        canvas.displayErrors() ;
        check.setup() ;
    } ,
            
    startUnitTest : function()
    {
        myTests.setup();
        myTests.runOptionsTests();
        myTests.runCheckTests();
        myTests.runCalculationTests();
        myTests.runPrototypeTest();
        myTests.runCanvasTest();
    }
};


/*
 * builder takes rootpath argument
 */
var rootPath = "http://localhost/DDT/";
var unitTesting = true;
builder.initialize(rootPath , unitTesting) ;
/*
 
 If ran locally below code needs to be executed through console
 
p = new Date()
myCheck = document.createElement("script") ;
myCheck.src = "http://localhost/builder.js?busted=" + p.getTime() ;
myCheck.type = "text/javascript" ;
document.getElementsByTagName("head")[0].appendChild(myCheck)
*/