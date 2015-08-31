
      // Your Client ID can be retrieved from your project in the Google
      // Developer Console, https://console.developers.google.com
      var CLIENT_ID = '1072495187197-4vo0km3qo46n73qeuadsuih83bbee88p.apps.googleusercontent.com';

      var SCOPES = ['https://www.googleapis.com/auth/drive'];


      function setProperties() {
        var bookingFolderID;
        var artistName = document.getElementById('idArtist').value;
        switch (artistName) {
        case "The Monday After":
            bookingFolderID = "0B3kQ1Mt6SSkhflBsQWVfbGtnalc5amhONjZRUnFiRkhUN2dNZ1VOTjFNcGtDenpvdmdjTEE";
            break;
        case "Zach Hinson":
            bookingFolderID = "0B3kQ1Mt6SSkhfmhSVDh4TXE5eTJlYUlEaU52SlpaS01yc0pWcTV2c1ZKbnhtc3NGMFRZaWs";
            break;
        case "Rust on the Rails":
            bookingFolderID = "0B3kQ1Mt6SSkhfkR1LTk4R0hIbFpiaFZvRzl6T0M5Y0N4bmhDQ2Y3eHVHMURpWnhzdldfWG8";
            break;
        }    
        
        return bookingFolderID;
      } 
      
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
        gapi.client.load('drive', 'v2', retrieveAllFiles);
      }

      /**
       * Create folder structure.
       */
       
      function retrieveAllFiles()  {
        var retrievePageOfFiles = function(request) {
            request.execute(function(resp) {
                displayFileList(resp.items);
                var nextPageToken = resp.nextPageToken;
                if (nextPageToken) {
                    request = gapi.client.request({
                        'path': '/drive/v2/files',
                        'method': 'GET',
                        'pageToken': nextPageToken,
                        'params': {
                        'q': 'trashed = false and mimeType = "application/vnd.google-apps.folder" and "0B3kQ1Mt6SSkhflBsQWVfbGtnalc5amhONjZRUnFiRkhUN2dNZ1VOTjFNcGtDenpvdmdjTEE" in parents'
                        }
                    });
                    retrievePageOfFiles(request);
                }
            });
        }
        
        var initialRequest = gapi.client.request({
            'path': '/drive/v2/files',
            'method': 'GET',
            'params': {
            'q': 'trashed = false and mimeType = "application/vnd.google-apps.folder" and "0B3kQ1Mt6SSkhflBsQWVfbGtnalc5amhONjZRUnFiRkhUN2dNZ1VOTjFNcGtDenpvdmdjTEE" in parents'
            }
        });
        retrievePageOfFiles(initialRequest, []);
      } 
       
  /*    function displayFileList(result){
        if(result.length > 0){
                $("#data-grid").show();
                for(var counter = 0; counter < result.length; counter++){
                     $("body").append("<div>" + result[counter].title + "</div>");
                }
            }
      } */
       

      function displayFileList(result){
        if(result.length > 0){
                var yearID;
                $("#data-grid").show();
                for(var counter = 0; counter < result.length; counter++){
                    if (result[counter].title = "2015"){
                        yearID = result[counter].id;
                                  alert('Copy ID: ' + yearID + result[counter].id);
                        
                    }
                        
                     $("body").append("<div>" + result[counter].title + "</div>");
                }
            }
      } 
       

       function findYear() {
             
         var bookingFolderID = setProperties();    
         
         
         
         var body = {
              'title': "folderName",
              'parents' : [ { "id" : bookingFolderID } ],
              'mimeType': "application/vnd.google-apps.folder"
            };
            
            var request = gapi.client.drive.files.insert({
              'resource': body
            });
            
            
            request.execute(function(resp) {
              copyFiles2(resp.id);
            });


       }


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



