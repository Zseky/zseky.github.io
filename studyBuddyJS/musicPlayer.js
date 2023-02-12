  function start() {
  // 2. Initialize the JavaScript client library.
  gapi.client.init({
    'apiKey': 'AIzaSyAMAfrdhuujo-OWlBWD94L5xM3Wu_iWo_w',
    // clientId and scope are optional if auth is not required.
    'clientId': '358913196619-ha74d4fmu6v206m0d668vdmhltf7m1b1.apps.googleusercontent.com',
    'scope': 'profile',
  }).then(function() {
    // 3. Initialize and make the API request.
    return gapi.client.request({
      'path': 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'
    })
  }).then(function(response) {
    console.log(response.result);
  }, function(reason) {
    console.log('Error: ' + reason.result.error.message);//+ reason.result.error.message);
  });
};
// 1. Load the JavaScript client library.
gapi.load('client', start);