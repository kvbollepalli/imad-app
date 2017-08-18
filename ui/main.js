// counter code 
var button = document.getElementById('counter');
var counter = 0 ; 

button.onclick = function () {
   
        // create a request object 
     var request = new XMLHttpRequest() ; 
    
    request.onreadystatechange = function (){
        if(request.readyState===XMLHttpRequest.DONE)
        {
            // TAKE SOME ACTION 
            if (request.status === 200)
            {
                // capture the response  and store it in a variable 
                var counter = request.responseText;
                // render the variable in the correct span 
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
        // not yet done 
        
    };
   
    //make the request 
    request.open("GET" , "http://kvbollepalli198112.imad.hasura-app.io/counter" , true );
    request.send(null);
};