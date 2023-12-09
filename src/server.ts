import Express from 'express';
const PORT = 8000;
const app = Express();

app.get('/', (req, res) => {
    console.log('Gett');
    res.send('Hello');
});

app.listen(PORT, () => {
    console.log(`Listening at port:${PORT}`)
})
