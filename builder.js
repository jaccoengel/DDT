var builder = {

    /*
     * Checks if jQuery is allready loaded on the page
     * Checks the default jQuery vars : $ & jQuery
     * If both of them do not exsist include jQuery
     * Then load the rest of the scripts
     **/

    initialize : function()
    {
        p = new Date();
        if($ === undefined && jQuery === undefined )
        {
            myJquery = document.createElement("script") ;
            myJquery.src = "http://http://code.jquery.com/jquery-1.9.1.js?busted=" + p.getTime() ;
            myJquery.type = "text/javascript" ;
            document.getElementsByTagName("head")[0].appendChild(myJquery)
            myJquery.addEventListener("load", function(){
                builder.loadScripts();
            }, false)
        }
        else
        {
            if(jQuery !== undefined)
            {
                $ = jQuery
            }
            builder.loadScripts();
        }
    } ,

    /*
     * Loads all the scripts required to check design (with the exception of jQuery)
     * Initializes check after all the scripts have loaded
     **/

    loadScripts : function()
    {
        var scriptArr = Array(
            "http://localhost/design_new/check.js" ,
            "http://localhost/design_new/options.js" ,
            "http://localhost/design_new/calculate.js" ,
            "http://localhost/design_new/prototyping.js" ,
            "http://localhost/design_new/canvas.js"
        );

        var loadingScripts = 0 ;

        for (script in scriptArr)
        {
            loadingScripts = loadingScripts + 1

            if(typeof(scriptArr[script]) != "function")
            {
                $.getScript(scriptArr[script] + "?busted=" + p.getTime() ,
                    function()
                    {
                        loadingScripts = loadingScripts - 1;
                    }
                )
            }
        }

        loadInterval = setInterval(function(){
            if(loadingScripts == 0)
            {
                clearInterval(loadInterval)
                builder.startCheck();
            }
        } , 200)
    },

    /*
     * Sets minimum offsetLeft to use
     * Builds canvas for error display and element highlighting
     * Starts the check setup
     **/

    startCheck : function()
    {
        options.setLeft();
        canvas.displayErrors() ;
        check.setup() ;
    }
}


builder.initialize();
/*
p = new Date()
myCheck = document.createElement("script") ;
myCheck.src = "http://localhost/design_new/builder.js?busted=" + p.getTime() ;
myCheck.type = "text/javascript" ;
document.getElementsByTagName("head")[0].appendChild(myCheck)
*/