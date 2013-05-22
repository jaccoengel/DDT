var builder = {

    /*
     * Checks if jQuery is allready loaded on the page
     * Checks the default jQuery vars : $ & jQuery
     * If both of them do not exsist include jQuery
     * Then load the rest of the scripts
     **/

    rootPath : false ,

    initialize : function(rootPath)
    {
        this.rootPath = rootPath
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
            "check.js" ,
            "options.js" ,
            "calculate.js" ,
            "prototyping.js" ,
            "canvas.js"
        );

        var loadingScripts = 0 ;

        for (script in scriptArr)
        {
            loadingScripts = loadingScripts + 1

            if(typeof(scriptArr[script]) !== "function")
            {
                $.getScript(this.rootPath + scriptArr[script] + "?busted=" + p.getTime() ,
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


/*
 * builder takes rootpath argument
 */
var rootPath = "http://localhost/"
builder.initialize(rootPath);
/*
 
 If ran locally below code needs to be executed through console
 
p = new Date()
myCheck = document.createElement("script") ;
myCheck.src = "http://localhost/builder.js?busted=" + p.getTime() ;
myCheck.type = "text/javascript" ;
document.getElementsByTagName("head")[0].appendChild(myCheck)
*/