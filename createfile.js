      // Your Client ID can be retrieved from your project in the Google
      // Developer Console, https://console.developers.google.com
      var CLIENT_ID = '1072495187197-4vo0km3qo46n73qeuadsuih83bbee88p.apps.googleusercontent.com';

      var SCOPES = ['https://www.googleapis.com/auth/drive.file'];

      /**
       * Check if current user has authorized this application.
       */
      function checkAuth() {
        gapi.auth.authorize(
          {
            'client_id': CLIENT_ID,
            'scope': SCOPES,
            'immediate': true
          }, handleAuthResult);
      }

      /**
       * Handle response from authorization server.
       *
       * @param {Object} authResult Authorization result.
       */
      function handleAuthResult(authResult) {
        var authorizeDiv = document.getElementById('authorize-div');
        if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
          authorizeDiv.style.display = 'none';
          //loadDriveApi();
        } else {
          // Show auth UI, allowing the user to initiate authorization by
          // clicking authorize button.
          authorizeDiv.style.display = 'inline';
        }
      }

      /**
       * Initiate auth flow in response to user clicking authorize button.
       *
       * @param {Event} event Button click event.
       */
      function handleAuthClick(event) {
        gapi.auth.authorize(
          {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
          handleAuthResult);
        return false;
      }

      /**
       * Load Drive API client library.
       */
      function loadDriveApi() {
        gapi.client.load('drive', 'v2', copyFile);
      }

      /**
       * Print files.
       */
       function copyFile() {
         var body = {
  'title': "folderName",
  'parents' : [ { "id" : "0B3kQ1Mt6SSkhflBsQWVfbGtnalc5amhONjZRUnFiRkhUN2dNZ1VOTjFNcGtDenpvdmdjTEE" } ],
  'mimeType': "application/vnd.google-apps.folder"
};

var request = gapi.client.drive.files.insert({
  'resource': body
});


request.execute(function(resp) {
  copyFiles2(resp.id);
});


       }
      /**
       * Append a pre element to the body containing the given message
       * as its text node.
       *
       * @param {string} message Text to be placed in pre element.
       */

      function copyFiles2(newID) {
        var body = {'title': "copyTitle",
                     'parents' : [ { "id" : newID } ]

                   };


        var request = gapi.client.drive.files.copy({
          'fileId': '1twkDnX_KQ6Kmd1W2RljeCQRBV0y3Tsh_3JGNZd6r_iw',
          'resource': body
        });
        request.execute(function(resp) {
          alert('Copy ID: ' + resp.id);
        });

      }


      function appendPre(message) {
        var pre = document.getElementById('output');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }
