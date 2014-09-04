module.exports = function ( app )
{
    app.get( "/temp", function ( req, res )
    {
        res.render( "temp", {
            themeClass: "blue",
            title: "Blog"
        });
    });
}