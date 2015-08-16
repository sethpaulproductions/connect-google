
    function onApiLoad() {
        gapi.load('auth', { 'callback': onAuthApiLoad });
        gapi.load('picker');
        gapi.client.load('drive', 'v2', function() {
            var request = gapi.client.request({
                'path': '/drive/v2/files',
                'method': 'POST',
                'body':{
                    "title" : "test.txt",
                    "description" : "Some"
                }
            });
            request.execute(function(resp) { console.log(resp); });
        });
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
            createPicker();
        }
    }


    function createPicker() {
        var picker = new google.picker.PickerBuilder()
            //.addView(new google.picker.DocsUploadView())
            .addView(new google.picker.DocsView())
            .setOAuthToken(oauthToken)
            //.setDeveloperKey('AIzaSyDPs9U-dgOC9h1jRFNwOwhRtARCph8_3HM')
            .setCallback(pickerCallback)
            .build();
        picker.setVisible(true);
    }

    function pickerCallback(data) {
        var url = 'nothing';
        if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
            var doc = data[google.picker.Response.DOCUMENTS][0];
            url = doc[google.picker.Document.URL];
        }
        var message = 'You picked: ' + url;
        document.getElementById('result').innerHTML = message;
    }
