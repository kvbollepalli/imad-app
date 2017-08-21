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

//submit name 

 
var submit = document.elementById('submit_btn');
submit.onclick = function(){
    // make a request to the server and send the name 
    // captur the list of names and render it as  a list
     var request = new XMLHttpRequest() ; 
    
    request.onreadystatechange = function (){
        if(request.readyState===XMLHttpRequest.DONE)
        {
            // TAKE SOME ACTION 
            if (request.status === 200)
            {
                 //var names = ['name1' , 'name2' , 'name3' , 'name4'] ;
                 var names=request.responseText;
                 names = JSON.parse(names);
    var list='';
    
    for(var i = 0 ; i < names.length ; i++)
    {
        list += '<li> '+ names[i] + '</li>';
      
    }
      var ul = document.getElementById('namelist');
      
        ul.innerHTML= list;
        
            }
        }
        // not yet done 
        
    };
   var nameInput= document.elementById('name');
      var name = nameInput.value;
    //make the request 
    request.open("GET" , "http://kvbollepalli198112.imad.hasura-app.io/submit-name?name=" + name  , true );
    request.send(null);
};
   
