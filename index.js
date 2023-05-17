const express = require("express");
const bodyParser = require ("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require ("passport");
const githubStratergy = require("passport-github2").Strategy;
const axios = require("axios");
const camiaoRoutes = require('./routes/camiaoRoutes');
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();
const port = 3009;
const GITHUB_CLIENT_ID = "3dfecaaff1b10c82ae34"; // PLEASE CREATE YOUR OWN APPLICATION AT GITHUB
const GITHUB_CLIENT_SECRET = "9b3128122499895a47b16bd420369d52da33092a"; // PLEASE CREATE YOUR OWN APPLICATION AT GITHUB
const GITHUB_CALLBACK_URI = "http://localhost:3009/auth/github/callback";

passport.serializeUser(function(user,done){done(null, user);});
passport.deserializeUser(function(user,done){done(null, user);});

const bodyParserOptions = {extended: true};
const passportOptions = {
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: GITHUB_CALLBACK_URI
};
const sessionOption = {
    secret: "my top secret key",
    resave: false,
    saveUninitialized: true
}


passport.use(
    new githubStratergy(
        passportOptions,
        function (accessToken, refreshToken, profile, done){
            profile.token = accessToken;
            return done(null, profile);
        }
    ));

const auth = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

const swaggerDefinition = { 
    openapi: "3.0.0",
    info: {
    title: "OAuth2.0_01",
    version: "1.0.0",
    description: "Example OAuth2.0 protected API",
    contact: { name: "Transport" },
    },
    servers: [{ url: "http://localhost:" + port }],
    /*components: { securitySchemes: {
    OAuth2Security: {
    type: "oauth2",
    flows: { authorizationCode: {
    authorizationUrl: "https://github.com/login/oauth/authorize",
    tokenUrl: "https://github.com/login/oauth/access_token",
    scopes: [], }, }, }, }, },
    security: [{ OAuth2Security: [] }]*/
};

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
}

const options = {
    swaggerDefinition,
    apis: ["./docs/**/*.yaml"],
    };
    

const swaggerSpec = swaggerJSDoc(options);
    app.get("/docs/swagger.json", (req, res) => res.json(swaggerSpec));
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(session({
    secret: 'secretpassword',
    resave: false,
    saveUninitialized: false
}));

/*app.use(session(sessionOption));*/
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(bodyParserOptions));


app.get('/camiao', ensureAuthenticated, camiaoRoutes);
app.get('/camiao/:id', camiaoRoutes);
app.put('/camiao/:id', camiaoRoutes);
app.post('/camiao', camiaoRoutes);


app.get('/protected', ensureAuthenticated, (req, res) => {
    res.send('Esta é uma página protegida');
  });



app.use('/api', camiaoRoutes);

app.get("/", auth , function (req, res){
    res.sendFile(__dirname+"/public/protected.html");
});
app.get("/login", function(req, res){
    res.sendFile(__dirname+"/public/login.html");
    /*res.sendFile(__dirname+"/public/login.html");*/
});
app.get("/logout", function(req,res){
    req.logout(function(err) {
        if (err) { 
            console.log(err); 
        }
        res.redirect("/login");
    });
});
app.get("/auth/github", 
    passport.authenticate("github", {scope: ["user.email"]}), 
    function(req, res){}
);
app.get("/auth/github/callback", 
    passport.authenticate("github", {failureRedirect: "/login"}),
    function(req, res){
        res.redirect("/");
    }
);
app.get("/me", auth, function(req,res){
    res.json(req.user);
});

app.get("/githubme", auth, function(req, res){
    const token = req.user.token;
    axios.get("https://api.github.com/user", {headers: {Authorization: `Bearer ${token}`}})
    .then(function(resp){
        console.log(resp);
        res.json(resp.data);
    })
    .catch(function(err){
        res.json(err);
    });
});



app.use(express.static(__dirname+"/public"));







(async () => {
    
    const database = require('./db');
    const Camiao = require('./models/camiao');
    const Camionista = require('./models/camionista');
    const Rota = require('./models/rota');
    const Armazem = require('./models/armazem');
    await database.sync(/*{force:true}*/);

    /*const novoCamionista = await Camionista.create({
        nome: 'Joao',
        cc: '15289571'
    })
    
    const novoCamiao = await Camiao.create({
        marca: 'BMW',
        matricula: 'ZZ',
        idCamionista : novoCamionista.id
    })*/
})();




//start server
app.listen(port, function(){console.log(`App running on http://localhost:${port}`)})






