// counter code 
var button = document.getElementById("counter");
var counter = 0 ; 

button.onclick = function () {
    // make a request to the counter endpoint 
    // capture the response  and store it in a variable 
    // render the variable in the correct span 
    // create a request object 
    var request = new XmlHttpRequest() ; 
    request.onreadystatechange = function (){
        if(request.readyState===XmlHttpRequest.DONE)
        {
            // TAKE SOME ACTION 
            if (request.status === 200)
            {
                var counter = request.responseText;
                var span = document.getElementById("count");
                span.innerHTML = counter.toString();
            }
        }
        // not yet done 
        
    };
   
    //make the request 
    request.open("GET" , "http://kvbollepalli198112.imad.hasura-app.io/counter" , true );
    request.send(null);
};