const express = require('express');
const cors = require('cors');
//const mysqlPool = require('./db');
const dotenv = require('dotenv');
const commande = require('./models/commande.js');
const detailCommande = require('./models/detailCommande.js');
userRoute = require('./routes/userRouter.js')
categoriesRouter = require('./routes/categoriesRouter.js')
produitRouter = require('./routes/produitRouter.js');
commandeRouter = require('./routes/commandeRouter.js');
detailCommandeRouter = require('./routes/detailCommandeRouter.js');
const { CheckUser, requireAuth } = require('./middleware/auth.middleware');
const authRouter = require("./routes/authRouter.js");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// jwt
app.get('*', CheckUser);

app.get('/jwtid', requireAuth, (req, res) => {
    if (res.locals.user && res.locals.user.id) {
        console.log("le user local est ", res.locals.user.id);
        res.status(200).json({ userId: res.locals.user.id });
    } else {
        console.log("Pas d'utilisateur authentifié trouvé");
        res.status(401).json({ error: 'Unauthorized' });
    }
});

app.use('/api/users', userRoute)
app.use('/api/categories', categoriesRouter)
app.use('/api/produits', produitRouter)
app.use('/api/commande', commandeRouter)
app.use('/api/detailCommande', detailCommandeRouter)
app.use("/api/auth", authRouter);





app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).send('Something went wrong!')
})


app.listen(process.env.PORT, () => console.log('App is listening on url http://localhost:' + process.env.PORT));