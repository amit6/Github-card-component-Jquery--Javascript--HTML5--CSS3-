(function($, gitHub){

    // Binds event for adding a user card on 'click' event of button,
    // or 'enter' key from keyboard.
    $('#add-user').on('click', 'button', handleGetUser);
    $('#add-user').keypress(handleGetUser);
    
    // handler for adding a user card.
    function handleGetUser(event){
        if(event.keyCode === 13 || $(event.target).is('button[name=add]')){
            
            if($('.card-container div.card.loading:first-child').length > 0){
                gitHub.handleValidation({message: 'Please wait...'});   
                return false;
            }
            
            var $input = $('input[name=user]');
            var name = $input.val();

            // handles with a message if no text is typed.
            if(name === ''){
                gitHub.handleValidation({message: 'Required'});
                return false;
            }

            // Restricts making an ajax call,
            // if user is already addedd in the component,
            // and shows the message.
            if(typeof gitHub.users[name.toLowerCase()] !== 'undefined'){
                gitHub.handleValidation({message: name + ' already added.'});
                return false;
            }

            // fetchs the user from github.
            gitHub.getUser({
                name : name
            });

            $input.val('');
            $input.focus();
        }
        return true;
        
    };
    
    // Handler to remove user from card component.
    $('.card-container').on('click', 'span.delete', function(event){

        // removes the user card with the help of 'id' attr.
        var $card = $(this).parent();
        var id = $card.attr('id');
        $card.remove();
        
        // removes the entry from global object.
        delete gitHub.users[id.toLowerCase()];
        return false;
        
    });
    
    // Handler to get user public github profile.
    $('.card-container').on('click', '.user-info', function(event){
        var id = $(this).parent().attr('id');
        window.open("https://github.com/"+id);
    });
    
    // Handler for sorting.
    $('.sort').on('click', 'li', function(event){
        if($(this).hasClass('sort-title')){
            return false;
        }
        
        // determines the type of sorting (asc/desc).
        var sort = $(this).attr('sort');
        
        // updates the view with sorting icon.
        $(this).attr('sort', $(this).attr('sort') === 'asc' ? 'desc' : 'asc' );
        
        // add/remove the 'active' class.
        $('.sort li').not($(this)).removeClass('active');
        $(this).addClass('active');
        
        // sorts on 'name' attribute.
        if($(this).hasClass('name')){
            gitHub.sortOnAttr({
                value : 'name',
                sort: sort
            });
            return false;
        }
        
        // sort on 'location' attribute.
        if($(this).hasClass('location')){
            gitHub.sortOnAttr({
                value : 'location',
                sort: sort
            });
            return false;
        }
        
        // sort on 'followers' attribute.
        if($(this).hasClass('followers')){
            gitHub.sortOnAttr({
                value : 'followers',
                sort: sort
            });
            return false;
        }
        
    });

})(jQuery, gitHub);