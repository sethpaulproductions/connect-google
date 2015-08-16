

    function onApiLoad() {
        gapi.load('auth', { 'callback': onAuthApiLoad });
        gapi.load('picker');
    }
    function onAuthApiLoad() {
        window.gapi.auth.authorize({
            'client_id': '1072495187197-4vo0km3qo46n73qeuadsuih83bbee88p.apps.googleusercontent.com',
            'scope': ['https://www.googleapis.com/auth/drive']
        }, handleAuthResult);
    }
    var oauthToken;
    function handleAuthResult(authResult) {
        if (authResult && !authResult.error) {
            oauthToken = authResult.access_token;
            createNewFile();
        }
    }

    function createNewFile() {
            document.getElementById('result').innerHTML = "Testing";
        gapi.client.load('drive', 'v2', function() {

           var request = gapi.client.request({
            'path': '/drive/v2/files',
            'method': 'POST',
            'body':{
                "title" : "cat.jpg",
                "mimeType" : "image/jpeg",
                "description" : "Some"
             }
         });

          request.execute(function(resp) { console.log(resp); });
       });

    }
