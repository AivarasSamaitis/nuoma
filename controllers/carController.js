const Car = require('../models/Cars')

module.exports.car_list = async (req, res) => {
    try {
        const cars = await Car.find()
        console.log(cars)
        res.render('cars/index', { cars })
    } catch (err) {
        console.log(err)
        res.status(500).send('Serverio klaida.')
    }
}

exports.updateCar = async (req, res) => {
    const { id } = req.params
    const { brand, model, year, engine, transmission, power, consumption, price } = req.body

    try {
        const updatedCar = await Car.findByIdAndUpdate(id, { brand, model, year, engine, transmission, power, consumption, price }, { new: true })
        if (!updatedCar) {
            return res.status(404).json({ error: 'Automobilis nerastas.' })
        }
        res.status(200).json(updatedCar)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Serverio klaida.' })
    }
}

exports.deleteCar = async (req, res) => {
    const { id } = req.params

    try {
        const deletedCar = await Car.findByIdAndDelete(id)
        if (!deletedCar) {
            return res.status(404).json({ error: 'Automobilis nerastas.' })
        }
        res.status(200).json({ message: 'Automobilis ištrintas sėkmingai.' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Serverio klaida.' })
    }
}

module.exports.create_car_get = (req, res) => {
    res.render('./cars/createCar')
}

module.exports.create_car_post = async (req, res) => {
    const { brand, model, year, engine, transmission, power, consumption, price } = req.body
    const image = req.file ? `/cars/${req.file.filename}` : null
    
    try {
        const car = await Car.create({ brand, model, year, engine, transmission, power, consumption, price, image })
        res.status(201).json({ car })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Nepavyko sukurti automobilio.' })
    }
}
