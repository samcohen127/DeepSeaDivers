const DiveController = require('../controllers/dive.controllers')
const { addDive, getAllDives, getOneDive, updateDive, deleteDive } = DiveController


module.exports = (app) => {
    app.get('/api/allDives', getAllDives)
    app.get('/api/divePage/:id', getOneDive)
    app.post('/api/addDive', addDive)
    app.put('/api/update/:id', updateDive)
    app.delete('/api/delete/:id', deleteDive)
}