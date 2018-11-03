require('dotenv').config();
const { express } = require('./globals');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors())
   .use(helmet())
   .use(compression())
   .use(bodyParser.json())
   .use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'frontend/dist')))
   .listen(PORT, () => console.log(`Listening on ${ PORT }`));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/dist/index.html'), (error) => {
        if (error) {
            res.status(500).send(error);
        }
    });
});