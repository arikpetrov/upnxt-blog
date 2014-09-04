var fs = require( "fs" );
var sqlite3 = require( "sqlite3" );

var Repository = function ( callback ) 
{
    var database_name = "./data/upnxt.db";
    var dbInstance = null;

    fs.exists( database_name, function ( exists )
    {
        if ( !exists )
            throw ( "Database not found" );
    });

    function using( callback )
    {
        dbInstance = new sqlite3.cached.Database( database_name );
        callback( dbInstance );
    };

    return {

        all: function ( query, callback )
        {
            using( function ( db )
            {
                db.all( query, callback );
            });
        },

        get: function ( query, data, callback )
        {
            using( function ( db )
            {
                db.get( query, data, callback );
            });
        }
    }
};

module.exports = Repository;