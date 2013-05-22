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
        width   : 0 ,
        height  : 0
    } ,

    /*
     * dimentionTrigger is used together with the minDimentions configuration.
     * This value is either "and" of "or"
     * "and" setting enables u to check the elements that meet both minimum height and width requirements
     * "or" setting enables u to check the elements that meet either the height or width requirement
     */
     
    dimentionTrigger : "and" ,
            
    /*Elements that should be removed from the site before the check starts */
    removeableIds : Array("cookie") ,

    /*
     * Toggle for diplaying only errors or displaying all checks
     */

    errorsOnly : true ,

    /*
     * Setter for minOffsetLeft
     **/
    setLeft : function()
    {
        this.minOffsetLeft = 0;
    }

}