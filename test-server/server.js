const express = require('express')
const cors = require('cors')
const app = express()
const port = 9000;

app.use(cors());


app.get('/', (req, res) => {

    setTimeout(() => {
        const error = req.query.error;
        if (error) {
            return res.sendStatus(400);
        }
        const empty = req.query.empty;
        if (empty) {
            return res.json([]);
        }

        res.json([
            {id: 1, name: 'Ali Faris', age: 27},
            {id: 2, name: 'Huda Sajed', age: 26},
            {id: 3, name: 'Mohammed Ali', age: 1},
            {id: 4, name: 'Fatima Ali', age: 5},
            {id: 5, name: 'Test', age: 0},
        ]);
    }, 3000);


});

app.listen(port, () => {
    console.log(`rac-core test server listening at http://localhost:${port}`);
});