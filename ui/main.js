// counter code 
var button = document.getElementById("counter");
var counter = 0 ; 
button.onclick = function () {
    // make a request to the counter endpoint 
    // capture the request and store it ina variable 
    // render the variable in the correct span 
    
    counter = counter + 1 ; 
    var span = document.getElementById("counter");
    span.innerHTML = counter.toString();
    
    
};