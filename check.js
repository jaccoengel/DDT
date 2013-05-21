var check = {

    /*
     * global           : Vars that can be used through the whole system
     * nodeObjectLeft   : Array of all the left associations
     * nodeObjectLeft   : Array of all the top associations
     **/

    global          : {} ,
    nodeObjectLeft  : null ,
    nodeObjectTop   : null ,

    /*
     * setter for values in global
     **/

    define : function(name , value)
    {
        tmpObj = {}
        tmpObj[name] = value
        $.extend(check.global , tmpObj)
    } ,

    /*
     * Recursively retrieve all the nodes from the loaded page
     **/

    getAllNodes : function(target , nodeList)
    {
        if(target === undefined)
        {
            target = document.getElementsByTagName("body")[0] ;
        }
        
        if(nodeList === undefined)
        {
            nodeList = Array();
        }

        for(var i = 0;i<target.childNodes.length;i++)
        {
            if(target.childNodes[i].nodeType != 3)
            {
                nodeList[nodeList.length] = target.childNodes[i] ;

                if(target.childNodes[i].childNodes.length > 0)
                {
                    this.getAllNodes(target.childNodes[i] , nodeList)
                }
            }
        }

        return nodeList ;

    } ,

    /*
     * Removes every element who's is is in options.removeableIds from the page
     **/

    removeElements : function()
    {
        idArray = options.removeableIds ;
        for(id in idArray)
        {
            if(document.getElementById(idArray[id]) != null)
            {
                document.getElementById(idArray[id]).parentNode.removeChild(document.getElementById(idArray[id]))
            }
        }
    } ,

    /*
     * Create an array with all absolute offsetLeft for given elements
     * Array nodes , a list of all the nodes for which offset top should be calculated
     **/

    fillLeftArray : function(nodes)
    {
        offsetLeftArr = Array()
        nodeObject = Array()
        for(var i = 0; i < nodes.length;i++)
        {
            offsetLeftArr[offsetLeftArr.length] = calculate.left(nodes[i])
        }
        offsetValues = calculate.getOffsetValues(offsetLeftArr).sort();

        for(var key = 0 ; key < offsetValues.length ; key++)
        {
            start = offsetValues[key] - options.associationMargin ;
            end = offsetValues[key] + options.associationMargin ;

            for(var j = 0 ; j < nodes.length ; j++)
            {
                left = calculate.left(nodes[j]);
                if(start < left &&  end > left)
                {
                    if(typeof(nodeObject[key]) != "object" )
                    {
                        nodeObject[key] = Array() ;
                    }

                    if(typeof(nodes[j]) != "function" )
                    {
                        nodeObject[key][nodeObject[key].length] = nodes[j] ;
                    }
                }
            }
        }
        return nodeObject ;
    } ,

    /*
     * Create an array with all absolute offsetTop for given elements
     * Array nodes , a list of all the nodes for which offset top should be calculated
     **/

    fillTopArray : function(nodes)
    {
        offsetTopArr = Array()
        nodeObject = Array()
        for(var i = 0; i < nodes.length;i++)
        {
            offsetTopArr[offsetTopArr.length] = calculate.top(nodes[i])
        }
        offsetValues = calculate.getOffsetValues(offsetTopArr).sort();
        for(var key = 0 ; key < offsetValues.length ; key++)
        {
            start = offsetValues[key] - options.associationMargin ;
            end = offsetValues[key] + options.associationMargin ;

            for(var j = 0 ; j < 50 /*nodes.length*/ ; j++)
            {
                topValue = calculate.top(nodes[j]);
                if(start < topValue &&  end > topValue)
                {
                    if(typeof(nodeObject[key]) != "object" )
                    {
                        nodeObject[key] = Array() ;
                    }

                    if(typeof(nodes[j]) != "function" )
                    {
                        nodeObject[key][nodeObject[key].length] = nodes[j] ;
                    }
                }
            }
        }
        return nodeObject ;
    } ,

    /*
     * Set up node retrieval
     * Run the left check
     * Run the top check
     **/

    setup : function()
    {
        this.removeElements();
        nodes = check.getAllNodes()

        nodeObjectLeft = check.fillLeftArray(nodes)
        this.checkLeft(nodeObjectLeft) ;

        nodeObjectTop = check.fillTopArray(nodes)
        this.checkTop(nodeObjectTop) ;
    } ,

    /*
     *  Compare the left alignment of all elements in nodeObject
     *  Array : nodeObject , array of all elements that need comparing
     **/

    checkLeft : function(nodeObject)
    {
        if(this.nodeObjectLeft == null)
        {
            this.nodeObjectLeft = nodeObject ;
        }
        for(objGroup in nodeObject)
        {

            objectCount = 0 ;
            for (obj in nodeObject[objGroup])
            {
                if(typeof(nodeObject[objGroup][obj]) != "function")
                {
                    objectCount = objectCount + 1
                }
            }

            if(objectCount > 1)
            {
                offsetLeftArray = Array() ;
                for (obj in nodeObject[objGroup])
                {
                    if(typeof(nodeObject[objGroup][obj]) != "function")
                    {
                        offsetLeftArray[offsetLeftArray.length] = calculate.left(nodeObject[objGroup][obj])
                    }
                }
                
                if(!offsetLeftArray.oneValue())
                {
                    errorObj = {
                        "left" : offsetLeftArray.minimum() + "px" ,
                        "top" : "0px" ,
                        "width" : "2px" ,
                        "height" : "100%" ,
                        "key" : "l_" + objGroup ,
                        "type" : "vertical"
                    }
                    canvas.createError(errorObj)
                }
                else
                {

                    errorObj = {
                        "left" : offsetLeftArray.minimum() + "px" ,
                        "top" : "0px" ,
                        "width" : "2px" ,
                        "height" : "100%" ,
                        "key" : objGroup ,
                        "type" : "vertical"
                    }
                    canvas.createError(errorObj , "Green")
                }
            }
        }
    } ,

    /*
     *  Compare the top alignment of all elements in nodeObject
     *  Array : nodeObject , array of all elements that need comparing
     **/

    checkTop : function(nodeObject)
    {
        if(this.nodeObjectTop == null)
        {
            this.nodeObjectTop = nodeObject ;
        }
        for(objGroup in nodeObject)
        {

            objectCount = 0 ;
            for (obj in nodeObject[objGroup])
            {
                if(typeof(nodeObject[objGroup][obj]) != "function")
                {
                    objectCount = objectCount + 1
                }
            }

            if(objectCount > 1)
            {
                offsetTopArray = Array() ;
                for (obj in nodeObject[objGroup])
                {
                    if(typeof(nodeObject[objGroup][obj]) != "function")
                    {
                        offsetTopArray[offsetTopArray.length] = calculate.top(nodeObject[objGroup][obj])
                    }
                }

                if(!offsetTopArray.oneValue())
                {
                    errorObj = {
                        "left" : "0px" ,
                        "top" : offsetTopArray.minimum() + "px" ,
                        "width" : "100%" ,
                        "height" : "2px" ,
                        "key" : "h_" + objGroup
                    }
                    canvas.createError(errorObj)
                }
                else
                {

                    errorObj = {
                        "left" : offsetTopArray.minimum() + "px" ,
                        "top" : "0px" ,
                        "width" : "100%" ,
                        "height" : "2px" ,
                        "key" : objGroup
                    }
                    canvas.createError(errorObj , "Green")
                }
            }
        }
    }
}