let express = require("express");
let morgan = require("morgan");
let fs = require("fs");

let app = express();
app.use(morgan("dev"));


// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(authentication);

// simulated auth
function authentication(req, res, next) {
    if (req.header.cookie == "a" || true) {
        next();
        return;
    } else {
        res.status(401).json({ msg: 'Unathorized' });
    }
}

app.get('/', (req, res) => {
    res.send("Hola. Esto es el backend");
});

app.get('/time', (req, res) => {
    res.json({
        time: new Date(Date.now()).toISOString()
    });
});

app.get('/pizzas', (req, res) => {
    fs.readFile(__dirname + '/ejemplos/pizzas.json', (err, datos) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        let obj = JSON.parse(datos.toString());
        res.json(obj);
    })
});

let port = process.env.PORT || 5000;
app.listen(port);

console.log("App listening on port: " + port);