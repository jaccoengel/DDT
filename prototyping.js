/*
 * Extends array object with a function to retrieve the minimum value from an array
 * Requirement : Array only contains integers
 **/

Array.prototype.minimum = function()
{
    var min = this[0];
    for(el in this)
    {
        if(this[el] < min)
        {
            min = this[el] ;
        }
    }
    return min;
};

/*
 * Extends array object with a function to retrieve the maximum value from an array
 * Requirement : Array only contains integers
 **/
Array.prototype.maximum = function()
{
    var max = this[0];
    for(el in this)
    {
        if(this[el] > max)
        {
            max = this[el] ;
        }
    }
    return max ;
};

/*
 * Extends array object with a function to check if the array consists of the same values
 * Requirement : Array only contains integers
 **/
Array.prototype.oneValue = function()
{
    var max = this[0];
    for(el in this)
    {
        if(this[el] !== max && !isNaN(this[el]))
        {
            return false;
        }
    }
    return true;
};
