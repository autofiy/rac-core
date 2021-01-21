const express = require('express')
const cors = require('cors')
const app = express()
const port = 9000;

app.use(cors());

let time = 0;

app.get('/search', (req, res) => {
    res.json([
        {id: 1, name: '$ Ali Faris', age: 27},
        {id: 2, name: '$ Huda Sajed', age: 26},
        {id: 3, name: '$ Mohammed Ali', age: 1},
        {id: 4, name: '$ Fatima Ali', age: 5},
    ]);
});

app.get("/heavy-process", (req, res) => {
    setTimeout(() => {
        res.json([
            {id: 1, name: '# Ali Faris', age: 27},
            {id: 2, name: '# Ali Hussain', age: 29},
            {id: 3, name: '# Ali Zaid', age: 22},
            {id: 4, name: '# Ali Mohammed', age: 24},
            {id: 5, name: '# Ali Ahmed', age: 26},
        ].filter(item => (req.query.query || "") === "" || item.name.includes(req.query.query)))
    }, 5000);
})

app.get('/all', (req, res) => {
    res.json([
        {id: 1, name: '$ Ali Faris', age: 27},
        {id: 2, name: '$ Huda Sajed', age: 26},
        {id: 3, name: '$ Mohammed Ali', age: 1},
        {id: 4, name: '$ Fatima Ali', age: 5},
        {id: 4, name: '$ Fatima Ali', age: 5},
        {id: 4, name: '$ Fatima Ali', age: 5},
        {id: 4, name: '$ Fatima Ali', age: 5},
        {id: 4, name: '$ Fatima Ali', age: 5},
        {id: 4, name: '$ Fatima Ali', age: 5},
        {id: 4, name: '$ Fatima Ali', age: 5},
        {id: 4, name: '$ Fatima Ali', age: 5},
        {id: 4, name: '$ Fatima Ali', age: 5},
    ]);
});

app.get('/', (req, res) => {

    time++;

    if (time === 4) {
        time = 1;
    }

    setTimeout(() => {
        if (time === 2) {
            return res.sendStatus(400);
        }
        if (time === 3) {
            return res.json([]);
        }

        res.json([
            {id: 1, name: 'Ali Faris', age: 27},
            {id: 2, name: 'Huda Sajed', age: 26},
            {id: 3, name: 'Mohammed Ali', age: 1},
            {id: 4, name: 'Fatima Ali', age: 5},
            {id: 5, name: 'Test', age: 0},
        ]);
    }, 1000);


});

app.listen(port, () => {
    console.log(`rac-core test server listening at http://localhost:${port}`);
});