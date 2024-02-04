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

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());


app.use('/api/users', userRoute)
app.use('/api/categories', categoriesRouter)
app.use('/api/produits', produitRouter)
app.use('/api/commande', commandeRouter)
app.use('/api/detailCommande', detailCommandeRouter)

app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).send('Something went wrong!')
})


app.listen(process.env.PORT, () => console.log('App is listening on url http://localhost:' + process.env.PORT ));