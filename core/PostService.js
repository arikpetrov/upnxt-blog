var PostRepository = require( "../data/PostRepository" );

var PostService = function ()
{
    var repo = new PostRepository();

    return {

        getLatest: function ( callback )
        {
            repo.getLatest( function ( err, post )
            {
                callback( err, post );
            });
        },

        getByUrl: function ( url, callback )
        {
            repo.getByUrl( url, function ( err, post )
            {
                callback( err, post );
            });
        }
    }
};

module.exports = PostService;
