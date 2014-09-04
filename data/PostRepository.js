var moment = require( "moment" );
var Repository = require( "./Repository" );

var PostRepository = function ()
{
    var repo = new Repository();
    var post = {};

    function buildPost( row )
    {
        if ( row )
        {
            post.Id = row.Id;
            post.title = row.Title;
            post.body = row.Body;
            post.createdOn = moment( row.CreatedOn ).format( "MMMM DD, YYYY" );
            post.githubLink = row.GithubLink,
            post.references = [];
            post.meta = {
                title: row.MetaTitle,
                keywords: row.MetaKeywords,
                description: row.MetaDescription
            };
        }
    };


    function buildReferences( rows )
    {
        if ( rows )
        {
            for ( var i = 0; i < rows.length; i++ )
            {
                var reference = rows[i].Reference;

                if ( reference )
                    post.references.push( reference );
            }
        }
    };


    function buildNextPrev( position, row )
    {
        if ( row )
        {
            post[position] = {
                title: row.Title,
                url: row.Url,
                linkText: row.LinkText
            };
        }
    };


    function getNextPrev( db, url, callback )
    {
        db.get( "SELECT Url, Title, LinkText \
                FROM POSTS \
                WHERE \
                        IsPublished = 1 \
                    AND CreatedOn > (SELECT CreatedOn FROM POSTS WHERE url = $url) \
                ORDER BY CreatedOn \
                LIMIT 1", { $url: url }, function ( err, next )
            {
                if ( next )
                    buildNextPrev( "next", next );

                db.get( "SELECT Url, Title, LinkText \
                     FROM POSTS \
                     WHERE \
                            IsPublished = 1 \
                        AND CreatedOn < (SELECT CreatedOn FROM POSTS WHERE url = $url) \
                     ORDER BY CreatedOn DESC \
                     LIMIT 1", { $url: url }, function ( err, prev )
                    {
                        if ( prev )
                            buildNextPrev( "prev", prev );

                        callback();
                    });
            });
    };


    //public methods
    return {

        getLatest: function ( callback )
        {
            post = { next: null, prev: null, references: [] };

      
                repo.all( "SELECT \
                            P.Id, P.Url, P.Title, P.Body, P.LinkText, P.MetaTitle, P.MetaKeywords, P.MetaDescription, P.CreatedOn, P.GithubLink, \
                            PR.Reference \
                       FROM POSTS P \
                       LEFT OUTER JOIN PostReferences PR ON P.Id = PR.PostId \
                       WHERE \
                                P.IsPublished = 1 \
                            AND P.Id = (SELECT Id FROM POSTS ORDER BY CreatedOn DESC LIMIT 1) \
                       ORDER BY P.CreatedOn DESC", function ( err, rows )
                    {
                        if ( rows && rows.length > 0 )
                        {
                            buildPost( rows[0] );
                            buildReferences( rows );

                            getNextPrev( repo, rows[0].Url, function ()
                            {
                                callback( null, post );
                            });
                        }

                        callback(null, post);
                    });
            
        },

        getByUrl: function ( url, callback )
        {
            post = { next: null, prev: null, references: [] };

            repo.serialize( function ( db )
            {
                db.all( "SELECT \
                            P.Id, P.Url, P.Title, P.Body, P.LinkText, P.MetaTitle, P.MetaKeywords, P.MetaDescription, P.CreatedOn, P.GithubLink, \
                            PR.Reference \
                       FROM POSTS P \
                       LEFT OUTER JOIN PostReferences PR ON P.Id = PR.PostId \
                       WHERE \
                                P.IsPublished = 1 \
                            AND P.Url = $url \
                       ORDER BY P.CreatedOn DESC", { $url: url }, function ( err, rows )
                    {
                        if ( rows && rows.length > 0 )
                        {
                            buildPost( rows[0] );
                            buildReferences( rows );

                            getNextPrev( db, url, function ()
                            {
                                callback( null, post );
                            });
                        }
                    });
            });
        }
    }
};

module.exports = PostRepository;
