var canvas = {

    /*
     * Boolean , used to determine if an error is locked on screen by clickng on it
     **/
    lock : false ,

    /*
     * Creates the error container
     * Creates the lock indicator
     **/

    displayErrors : function()
    {
        check.define("errorBox", "errorBox") ;

        $("<div></div>")
            .appendTo($("body"))
            .css({
                position    : "absolute" ,
                left        : "0px" ,
                top         : "0px" ,
                width       : "100%" ,
                height      : document.getElementsByTagName("body")[0].offsetHeight + "px" ,
                zIndex      : "7500"
            })
            .attr({
                id          : "errorBox"
            }) ;

        $("<div></div>")
            .appendTo($("#" + check.global.errorBox))
            .css({
                position        : "fixed",
                left            : "5px" ,
                bottom          : "5px" ,
                border          : "1px solid #000" ,
                padding         : "5px" ,
                cursor          : "pointer" ,
                backgroundColor : "#FFF"
            })
            .attr({
                id              : "errorLock"
            })
            .html("Unlocked")
            .click(function()
            {
                canvas.lock = false;
                $("#errorLock").html("Unlocked") ;
                canvas.displayAllErrors();
            }) ;

    } ,

    /*
     *  Function that shows all the elements based on key
     *
     *  Manditory argument(s)
     *      Key : key of the error 
     **/

    showElements : function(key)
    {
        key = key.split("_") ;
        errorType = key[0] ;
        key = key[1] ;
        indicator = 1 ;
        nodeObject = (errorType === "h") ? check.nodeObjectTop : check.nodeObjectLeft ;
        for (obj in nodeObject[key])
        {
            if(typeof(nodeObject[key][obj]) !== "function")
            {
                $("<div></div>")
                    .appendTo(
                        $("<div></div>")
                            .appendTo($("#" + check.global.errorBox))
                            .css({
                                position        : "absolute",
                                left            : (calculate.left(nodeObject[key][obj])-3) + "px" ,
                                top             : (calculate.top(nodeObject[key][obj])-3) + "px" ,
                                width           : nodeObject[key][obj].offsetWidth + "px" ,
                                height          : nodeObject[key][obj].offsetHeight + "px" ,
                                backgroundColor : "#FFF" ,
                                zIndex          : "7500" ,
                                border          : "3px solid blue" ,
                                opacity         : 0.45
                            })
                            .addClass("relatedElement")
                            .attr({
                                "id" : "error_" + indicator
                            })
                    )
                    .css({
                        zIndex : "7500",
                        opacity         : 2 ,
                        backgroundColor : "#FFF"
                    })
                    .html(indicator);
                    indicator = indicator + 1 ;
            }
        }
        errors = calculate.errors(errorType , nodeObject[key]) ;
        canvas.displayRelatedErrors(errors) ;
    } ,

    /*
     * display errors for selected error
     */
     
     displayRelatedErrors : function(errors)
     {
        $("#errorTable").remove() ;
        indicator = 2 ;
        errorBox = $("<table></table>").appendTo($("#" + check.global.errorBox)).css({
            "position" : "fixed" ,
            "right" : "5px" ,
            "bottom" : "5px" ,
            "backgroundColor" : "#FFF" ,
            "border" : "1px solid #000" ,
            "padding" : "5px"
        }).attr({"id" : "errorTable"}) ; 
        for(var error = 0 ; error < errors.length ; error++)
        {
            errorTr = $("<tr></tr>")
                .appendTo(errorBox)
                .mouseover(function(){
                    console.log(this.childNodes[0].innerHTML)
                    $("div.relatedElement[id!=error_" + this.childNodes[0].innerHTML + "]").css({"display" : "none"})
                    $("div.relatedElement[id=error_1]").css({"display" : ""})
                })
                .mouseout(function(){
                    $("div.relatedElement[id!=error_" + this.childNodes[0].innerHTML + "]").css({"display" : ""})
                });
            $("<td></td>").html(indicator).appendTo($(errorTr)) ;
            $("<td></td>").html(":").appendTo($(errorTr)) ;
            $("<td></td>").html(errors[error] + "px").appendTo($(errorTr)) ;
            indicator = indicator + 1 ;
        }
     } ,

    /*
     * Displays all the error on screen
     **/

    displayAllErrors : function()
    {
        $("#errorBox div")
            .css({
                display : ""
            }) ;
        $(".relatedElement").remove() ;
    } ,

    /*
     *  Function that creates the error objects on screen.
     *  Manditory argument(s) :
     *      errorObj
     *
     *  Optional argument(s)
     *      bgColor (color of the displayed array)
     *
     * example errorObj :
     * {
     *      Manditory
     *          top     : 100px
     *          left    : 100px
     *          width   : 10px
     *          height  : 10px
     *      Optional
     *          text    : text to display on mouse over
     * }
     **/

    createError : function(errorObj , bgColor)
    {
        if($("#" + check.global.errorBox).length === 0)
        {
                return false ; 
        }
        alt = (errorObj.info === undefined)         ? "No additional information available" : errorObj.info ;
        elPosition = (errorObj.type !== undefined)  ? "fixed"                               : "absolute" ;
        bgColor = (bgColor === undefined)           ? "Red"                                 : bgColor ;



        $("<div></div>")
            .appendTo($("#" + check.global.errorBox))
            .css({
                opacity         : 0.45 ,
                left            : errorObj.left ,
                top             : errorObj.top ,
                width           : errorObj.width ,
                height          : errorObj.height ,
                backgroundColor : bgColor ,
                position        : elPosition ,
                zIndex          : "7500"
            })
            .attr({
                title           : alt
            })
            .addClass(errorObj.key)
            .mouseover(
                function(){
                    $("#errorBox div[class!=" + errorObj.key + "]")
                        .css({
                            display : "none"
                        }) ;
                    $("#errorBox div[id=errorLock]")
                        .css({
                            display : ""
                        }) ;
                    canvas.showElements(errorObj.key) ;
                }
            )
            .mouseout(
                function(){
                    if(canvas.lock === false)
                    {
                        canvas.displayAllErrors();
                    }
                    
                }
            )
            .click(
                function()
                {
                    canvas.lock = true ;
                    $("#errorLock")
                        .html("Locked , click here to unlock") ;
                }
            )
    }
}