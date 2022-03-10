import express from 'express';

const app = express();

console.log(2);
app.listen(5000, () => {
    console.log('Server has started!!!!!!');
});
