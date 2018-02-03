(function($, gitHub){
    
    // 'gitHub' reference to a global object,
    // appending 'users' object to 'gitHub'.
    // 'users' obnject will contain all the users added to the card component.
    gitHub.users = {};
    
    // 'User' constructor function.
    // add default properties to the newly created 'User' object.
    function User(){
        this.id = ''
        this.name = 'Not Mentioned';
        this.location = 'Not Mentioned';
        this.followers = 0;
        this.imgSrc = '';
    };
    
    // Defines DOM structure of 'User' object. (user card).
    User.prototype.getCardTemplate = function(){
        return  '<span class="delete" title="Delete">X</span>'
                + '<img src='+this.imgSrc+'></img>'
                + '<div class="user-info" title="View Profile">'
                    + '<div class="name">'+this.name+'</div>'
                    + '<div class="location">'
                        + 'Location: <span>'+this.location+'</span>'
                    + '</div>'
                    + '<div class="followers">'
                        + 'Followers: <span>'+this.followers+'</span>'
                    + '</div>'
                + '</div>'
    };
    
    // Fetches the DOM structure for 'User' object,
    // adds attributes to 'User' DOM element
    // append to the main DOM (component card).
    User.prototype.addUser = function(){
        // Newly added user will be shown at the begining of the list.
        var $card = $('.card-container div.card.loading:first-child');
        
        // login name will be unique,
        // will add it as a 'id' attr to user card element,
        // uniques will help in locating the user card element in main component.
        $card.attr({
            id: this.id,
            name: this.name,
            location: this.location,
            followers: this.followers
        });
        
        // gets the user card DOM.
        // and append to the card holder.
        var $template = $(this.getCardTemplate());
        $card.append($template);
        
    };
    
    // Takes to public Github profile page of the 'User' object.
    User.prototype.getProfile = function(){
        $.ajax({
            url : "https://github.com/"+this.name
        });
    };
    
    // Makes an ajax call to add a user card to the card component.
    // Before making a ajax call, adds a user card with a loading icon.
    // On success, creates a new 'User' object,
    // and adds the relevant properties of JSON response to the new object.
    // On complete, handles the status of the response,
    // if success, removes the loading icon and append the 'User' object DOM to the card,
    // if error, shows the status Text and removes the loading icon along with card element.
    gitHub.getUser = function(args){
        $.ajax({
            url : "https://api.github.com/users/"+args.name,
            dataType : 'json',
            beforeSend : function(){
                $('<div>').addClass('card loading').append(
                    $('<div>').addClass('loader')
                ).prependTo($('.card-container'));
            },
            success : function(json){
                
                // create new user object.
                var user = new User();
                
                // update the properties of new user.
                user.id = json.login;
                user.name = json.name === null ? json.login : json.name;
                user.location = json.location === null ? user.location : json.location;
                user.followers = json.followers === null ? user.followers : json.followers;
                user.imgSrc = json.avatar_url;
                
                // add 'User' object to the 'users' property of the global object(gitHub).
                gitHub.users[(user.id.toLowerCase())] = user;
                
                // append new user template to main DOM.
                user.addUser();
                return true;
            },
            complete : function(xhrObject, status){
                var $card = $('.card-container div.card.loading:first-child');
                if(status === 'success'){
                    $card.find('.loader').remove();
                    $card.removeClass('loading');
                }else if(status === 'error'){
                    $card.remove();
                    gitHub.handleValidation({message: xhrObject.statusText});
                }
            }
        });
    };
    
})(jQuery, window.gitHub ? window.gitHub : window.gitHub = {});