const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/deepseadiverdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res) => {
    console.log('Successfully connected to DeepSeaDiverDB')
}).catch((err) => {
    console.log(err)
})