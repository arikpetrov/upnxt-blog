    require.config(
    {
        urlArgs: "nocache=" + (new Date()).getTime(),
        baseUrl: "/",
        paths:
        {
            "jquery": "/js/lib/jquery.min",
            "knockout": "/js/lib/knockout.min",
            "postViewModel": "/js/app/postViewModel"
        },
        shim: {
            "postViewModel": { deps: ["jquery", "knockout"] }
        }
    });