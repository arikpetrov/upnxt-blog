define( ["jquery", "knockout"], function ( ko )
{
    $( function ()
    {
        $( "ol.code li, span.code.inline" ).each( function ()
        {
            var line = $( this ).html();
            var s_pattern = /(".*?")/gi;
            var c_pattern = /(\[.*?\])/gi;
            var tag_pattern = /(<.*?>)/gi;
            var at_pattern = /@/gi;
            var fn_pattern = /(var )|(new )|(if )|(throw )|(function)|(return)|(public )|(namespace )|( get)|( set)|(long)|( string)|(class )|(where)(void )|(using )|(private readonly)/gi;
            var val_pattern = /\d/gi;
            var interface_pattern = /\bI\S*/g;

            if ( line.match( tag_pattern ) )
            {
                line = line.replace( tag_pattern, function ( match, token )
                {                  
                    return '<span class="tag">' + match.replace("<", "&lt;").replace(">", "&gt;") + '</span>';
                });
            }

            if ( line.match( s_pattern ) )
            {
                line = line.replace( s_pattern, function ( match, token )
                {
                    if (match.indexOf('"tag"') > -1 || match.indexOf('"p"') > -1 || match.indexOf('"c"') > -1)
                        return match;

                    return '<span class="s">' + match + '</span>';
                });
            }

            if ( line.match( at_pattern ) )
            {
                line = line.replace( at_pattern, function ( match, token )
                {
                    return '<span class="at">' + match + '</span>';
                });
            }

            if ( line.match( fn_pattern ) )
            {
                line = line.replace( fn_pattern, function ( match, token )
                {
                    return '<span class="fn">' + match + '</span>';
                });
            }
            
            if (line.match(val_pattern)) {
                line = line.replace(val_pattern, function (match, token) {
                    return '<span class="val">' + match + '</span>';
                });
            }
            
            if (line.match(interface_pattern)) {
                line = line.replace(interface_pattern, function (match, token) {
                    return '<span class="i">' + match + '</span>';
                });
            }
            
            if (line.match(c_pattern)) {
                line = line.replace(c_pattern, function (match, token) {
                    return '<span class="c">' + match.replace("[", "").replace("]","") + '</span>';
                });
            }

            $( this ).html( line );
        });
    });
});