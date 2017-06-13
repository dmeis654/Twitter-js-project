const express = require( 'express' );
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser')
const app = express();
const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
const routes = require('./routes');
const socketio = require('socket.io')
const server = app.listen(3000)
const io = socketio.listen(server)

var locals = {
    title: 'An Example',
    people: [
        { name: 'Gandalf'},
        { name: 'Frodo' },
        { name: 'Hermione'}
    ]
};

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

nunjucks.configure('views', {noCache: true});
nunjucks.render('index.html', locals, function (err, output) {
    console.log(output);
});


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// app.use('/', routes);
app.use( '/', routes(io) );

app.use(express.static('public'));

// app.use(function (req, res, next) {
//     console.log("hi")
//     next()
// })

// app.get('/', function (req, res) {
//   res.render( 'index', {title: 'Hall of Fame', people: locals.people} );
// })

// app.listen(3000, function(){
//     console.log("server listening")
// })