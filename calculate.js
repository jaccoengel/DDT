var calculate = {

    /*
     * Gives absolute offsetLeft for given element
     * Object souce , element for which absolute offsetLeft should be returned
     **/

    left : function(source){
        offset = $(source).offset().left ;
        return offset ;
    } ,

    /*
     * Gives absolute offsetTop for given element
     * Object souce , element for which absolute offsetTop should be returned
     **/

    top : function(source){
        offset = $(source).offset().top ;
        return offset ;
    } ,

    /*
     *  creates an array of all related elements based on options.associationMargin
     *  Array offsetList ,  array of offsetLeft values
     **/

    getOffsetValues  :function(offsetList)
    {
        offsets = Array();
        margin = options.associationMargin ;

        for(var i = 0; i < offsetList.length ; i++)
        {
            if(this.isThere(offsetList[i] , margin , offsets) === false)
            {
                offsets[offsets.length] = offsetList[i]
            }
        }

        return offsets ;
    },

    /*
     * Determines if an associated element is allready defined is a sub-array , if yes add, if not create
     * Int value , value to check
     * Int margin , association margin
     * Array offsets , array of offsets to check for value
     **/

    isThere : function(value , margin , offsets)
    {
        if(offsets.length > 0)
        {
            for(var i = 0 ; i < offsets.length ; i++)
            {
                start = offsets[i] - margin ;
                end = offsets[i] + margin ;
                if(start < value &&  end > value)
                {
                    return i ;
                }
            }
        }

        return false ;
    } ,

    meetsMinimumSize : function(element)
    {
        /* todo : create filter for comment elements */
        try
        {
            var width  = $(element).width();
            var height = $(element).height();
            switch(options.dimentionTrigger)
            {
                case "and" :
                {
                    if(width >= options.minDimentions.width && height >= options.minDimentions.height)
                    {
                        return true ;
                    }
                    else
                    {
                        return false ;
                    }
                }
                break ;
                case "or" :
                {
                    if(width >= options.minDimentions.width || height >= options.minDimentions.height)
                    {
                        return true ;
                    }
                    else
                    {
                        return false ;
                    }
                }
                break ;
                default :
                {
                    alert("Configuration error on the following value : dimentionTrigger") ;
                }
            }
        }
        catch(e)
        {
            
        }
    }

} ;