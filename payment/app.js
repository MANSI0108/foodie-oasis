// app.js
const express = require('express');
const bodyParser = require('body-parser');
const paymentRoutes = require('./src/routes/paymentRoute');
const ErrorHandler = require('./src/middleware/asyncHandler');




const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');



app.use('/payment', paymentRoutes);

app.use(ErrorHandler)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
