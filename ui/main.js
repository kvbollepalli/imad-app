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
var nameInput= document.elementById('name');
var value = nameInput.value; 
var submit = document.elementById('submit');
submit.onclick = function(){
    // make a request to the server and send the name 
    // captur the list of names and render it as  a list
    
    var names = ['name1' , 'name2' , 'name3' , 'name4'] ;
    var list='';
    
    for(var i = 0 ; i<names.length ; i++)
    {
        list+= "<li> '+ names[i] +' </li>";
        var ul = document.getElementById('namelist');
        ul.innerHTML= list;
        
    }
};