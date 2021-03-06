var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');




var config={
    user:'kvbollepalli198112' , 
    database:'kvbollepalli198112' ,
    host:'db.imad.hasura-app.io' , 
    port:'5432' , 
    password:process.env.DB_PASSW0RD
};

var app = express();
app.use(morgan('combined'));


function createTemplate(data)
{
    
var title = data.title;
var date = data.date;
var heading = data.heading ;
var content = data.content;
var htmlTemplate=`

<html>
<head>
    <title>
        ${title}
    </title>
    <meta name="viewport" content="width-device-width , vertical-scale-1"/>
    <link href="/ui/style.css" rel="stylesheet" />
  
</head>
<body>
    
    <div class="container">
        <div>
            
            <a href="/"  > Home </a>
            
        </div>
        <HR/>
        <H3>
           ${heading}
        </H3>
        <div>
            ${date}
        </div>
        
        <div>
            ${ content }
            
        </div>
    </div>
</body>


</html>

`;
return htmlTemplate;
}



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

//var hash = new hash();
function hash(input,salt)
{
    // how do we create input
    var hashed= crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return hashed.toString('hex');
}
app.get('/hash/:input',function(req,res)
{
    var hashedString=hash(req.params.input , 'this is -some-random-string');
    
    res.send(hashedString);
});

var  pool = new Pool(config);
app.get('/test-db', function(req,res)
{
    // make s select req
    // return a response with the result
    
    pool.query('SELECT * FROM test', function(err , result)
    {
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else 
        {
            res.send(JSON.stringify(result.rows));
        }
    });
});

var counter=0;
app.get('/counter' , function(req,res){
  counter = counter+1;  
  res.send(counter.toString());
});

var names=[];
// 1 -- app.get('/submit-name/:name' , function(req,res){
    app.get('/submit-name' , function(req,res){
    // get the name from the request 
    //1 --- var name = req.params.name ;
    var name = req.query.name;
    names.push(name);
    // json javascript object notation
    
    res.send(JSON.stringify(names));
    
});


var articles = {
    

'article-one' : {
    
    title: 'article one | krishnaveni ' , 
    heading : 'article one ' , 
    date : '13 aug ,  2017' , 
    content : ` <p>
                This is the  content for my  first article .This is the  content for my  first article. 
                This is the  content for my  first article .
              </p>
            <p>
                This is the  content for my  first article .This is the  content for my  first article. 
                This is the  content for my  first article .
            </p>
            <p>
                This is the  content for my  first article .This is the  content for my  first article. 
                This is the  content for my  first article .
            </p> `
    
    
    
},
'article-two':{
     title: 'article two | krishnaveni ' , 
    heading : 'article two ' , 
    date : '16 aug ,  2017' , 
    content : ` <p>
                This is the  content for my  second  article .
            </p> `
    
    
    
},
'article-three' : {
     title: 'article three | krishnaveni ' , 
    heading : 'article three ' , 
    date : '23 aug ,  2017' , 
    content : ` <p>
                This is the  content for my  third  article .
            </p> `
    
}
};


app.get('/articles/:articleName' , function(req, res){
    var articleName=req.params.articleName;
    pool.query("SELECT * FROM article where title = '" + req.params.articleName + "'" , function(err,result)
    {
        
    });
   res.send(createTemplate(articles[articleName]));
   
     if(err)
        {
            res.status(500).send(err.toString());
        }
        else 
        {
            if(result.rows.length===0)
            {
                res.ststus(404).send('Article not found');
            }
            else{
                var articleData = result.rows(0);
                
            res.send(createTemplate(articleData));
            }
        }
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});


app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

    
    


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
