(function($, gitHub){

    gitHub.sortOnAttr = function(attr){
        var $container = $('.card-container');
        
        // get all the users card, 
        // convert it into clean array,
        // and sort based on 'attr.value' parameter passed as an argument.
        var $sort = $container.find('.card').get().sort(function(obj1, obj2){
            
            // determines the sorting order(asc/desc).
            if(attr.sort === 'desc'){
                var temp = obj1; 
                obj1 = obj2;
                obj2 = temp;
            }
            
            obj1 = $(obj1).attr(attr.value).toLowerCase();
            obj2 = $(obj2).attr(attr.value).toLowerCase();
            
            // if attr is based on Number,
            // convert it into integers.
            if(attr.value === 'followers'){
                obj1 = parseInt(obj1);
                obj2 = parseInt(obj2);
            }
            
            if (obj1 > obj2) {
                return 1;
            }
            
            if (obj1 < obj2) {
                return -1;
            }
            
            // obj1 must be equal to obj2
            return 0;
        });
        
        // updates the view with sorted data.
        $container.find('.card').remove();
        $($sort).appendTo($container);
    };
    
    // generic handler for input text.
    gitHub.handleValidation = function(args){
        var $input = $('input[name=user]');
        $input.addClass('required');
        $input.focus();
        $input.val('');
        $input.attr('placeholder', args.message);
        $input.bind('keyup', validater);
        return false;
    };
    
    // validations
    validater = function (event){
        if(event.keyCode === 13){
            return false;
        }
        $(this).attr('placeholder', 'github login');
        $(this).removeClass('required');
        $(this).unbind('keyup', validater);
        return false;
    };
    
})(jQuery, window.gitHub);