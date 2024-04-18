const Message = require('../models/Message')

exports.createMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body
        const newMessage = new Message({
            name: name,
            email: email,
            message: message
        })

        await newMessage.save()

        res.status(201).json({ success: true, message: 'Žinutė įrašyta sėkmingai.' })
    } catch (err) {
        res.status(500).json({ success: false, message: 'Įvyko klaida įrašant žinutę.', error: err.message })
    }
}
