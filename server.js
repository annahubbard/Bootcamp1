var http = require('http'),
	//use the File System module (fs) to load listings.json into memory
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;


var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);
  //console.log(JSON.stringify(request));
  //console.log(request); -- prints out all object attributes on node.js terminal 
  //'GET' is type under method: attribute 
	/*
	HTTP request methods
	The GET method requests a representation of the specified resource. 
	Requests using GET should only retrieve data.
	format is JASON 
	checking if 'request' object is  a GET request 
	*/
	
	if(request.method == 'GET'){
		//if( url.parse(request.url).pathname == '/wait' ){
		if(parsedUrl.pathname == '/listings'){
			//MIME types: JSON file
			response.writeHead(200, {'Content-Type': 'application/json'});
			//response.write(JSON.stringify(listingData)); 
			response.end(listingData);
		}
		else{
			response.writeHead(404);
			//response.write('Bad gateway error');
			response.end('Bad gateway error'); 
		}
	}

  /*
    Your request handler should send listingData in the JSON format as a response if a GET request 
    is sent to the '/listings' path. Otherwise, it should send a 404 error. 

    HINT: Explore the request object and its properties 
    HINT: Explore the response object and its properties
    https://code.tutsplus.com/tutorials/http-the-protocol-every-web-developer-must-know-part-1--net-31177
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
    
    HINT: Explore how callback's work 
    http://www.theprojectspot.com/tutorial-post/nodejs-for-beginners-callbacks/4
    
    HINT: Explore the list of MIME Types
    https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
   */
};



fs.readFile('listings.json', 'utf8', function(err, data) {
  /*
   This callback function should save the data in the listingData variable, 
   then start the server. 

   HINT: Check out this resource on fs.readFile
   //https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback

   HINT: Read up on JSON parsing Node.js
  */
 
   //Check for errors
	if (err) throw err;
  

   //Save the sate in the listingData variable already defined
	listingData = data; 
  

   //Creates the server
	server = http.createServer(requestHandler);
  
   //Start the server
	server.listen(port, function() {
    //once the server is listening, this callback function is executed
    console.log('server listening on: http://localhost:' + port);
	});


});