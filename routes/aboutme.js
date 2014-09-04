module.exports = function ( app )
{
    app.get( "/about-me", function ( req, res )
    {
        res.render( "aboutme", {
            themeClass: "none",
            title: "aboutme"
        });
    });
}