const mongoose = require('mongoose');

mongoose.connect('https://eco-buddy-backend.onrender.com', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));
