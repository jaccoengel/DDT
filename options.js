/*
 * Contains all the configurables for the designcheck
 **/

var options = {

    /*
     * int associationMargin , the number of pixels to the left or right an
     * element can be to be associated with the base element
     **/
    associationMargin   : 3 ,

    /*
     * The minimum value offsetLeft should have in order to be eligable for checking
     **/
    minOffsetLeft       : 0 ,

    /*
     * The minimum dimensions an element should have to be eligable for tracking
     * This gives the option to exclude i.e. tracking pixels
     **/
    minDimentions       : {
        width   : 10 ,
        height  : 10
    } ,

    /*Elements that should be removed from the site before the check starts */
    removeableIds : Array("cookie") ,

    /*
     * Toggle for diplaying only errors or displaying all checks
     */

    errorsOnly : false ,

    /*
     * Setter for minOffsetLeft
     **/
    setLeft : function()
    {
        this.minOffsetLeft = 0;
    }

}