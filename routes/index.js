var PostService = require( "../core/PostService" );

module.exports = function ( app )
{
    var service = new PostService();

    app.get( "/", function ( req, res )
    {
        service.getLatest( function ( error, post )
        {            
            res.render("index", post);
        });
    });


    app.get( "/blog/:url", function ( req, res )
    {
        service.getByUrl( req.params.url, function ( error, post )
        {
            res.render( "index", post );
        });
    });
}