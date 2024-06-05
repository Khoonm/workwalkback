const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const employeeRouter = require('./routes/employee.js');
const workRouter = require('./routes/work.js');
const workStatusRouter = require('./routes/workStatus.js');
const crawledDataRouter = require('./routes/crawledData.js');

const startServer = async () => {
    const hostname = '127.0.0.1';
    const app = express();
    app.set('port', process.env.PORT || 3000);
    app.set("host", process.env.HOST || "0.0.0.0");
    const port = app.get('port');
    
    app.use(bodyParser.json());

    sequelize.sync()
        .then(() => {
            console.log('Database synced');
        })
        .catch(err => {
            console.error('Error syncing database:', err);
        });


    app.get('/', (req, res) => {
        res.sendFile(__dirname+'/index.html');
    });

    app.use('/', employeeRouter);
    app.use('/', workRouter);
    app.use('/', workStatusRouter);
    app.use('/', crawledDataRouter);

    app.listen(app.get('port'), ()=>{
        console.log(app.get('port'), '번 포트에서 서버 실행 중..')
        console.log(`http://${hostname}:${port}/`)
    });
};

exports.startServer = startServer;