const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/tweatTB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res) => {
    console.log('Successfully connected to deepseaDB')
}).catch((err) => {
    console.log(err)
})