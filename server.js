// npm packages
var express = require('express')
var bodyparser = require('body-parser')
var path = require('path')
var morgan = require('morgan')
var expresshbs = require('express-handlebars')

// new express app
var app = express()
var helpers = {
  additon: function(){
    console.log(1 + 1);//
  },
  givemeage: function(obj){
    console.log(obj.age);
    return obj.age;
  }
}

// middleware
app.use(morgan('dev'))
app.engine('hbs', expresshbs({defaultLayout: 'main', extname: '.hbs', helpers: helpers}))
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())


// your code here...
var obj = {
  name: "Hector",
  age: 21,
  isBool: true,
  randstr: "dfsddf"
}


app.get('/', function (req, res) {
  res.render('index', {person: obj});
})

var PORT = process.env.PORT || 3000
// listening port
app.listen(PORT, function (e) {
  if (e) throw e
  console.log("PORT: " + PORT);
})
