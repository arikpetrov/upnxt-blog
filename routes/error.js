module.exports = function ( app )
{
    app.use( function ( req, res )
    {
        res.status( 400 );
        res.render( "404.vash", {});
    });

    app.use( function ( error, req, res, next )
    {
        res.status( 500 );
        res.render( "500.vash", {});
    });
}