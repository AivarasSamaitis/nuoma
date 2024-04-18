const User = require('../models/User')
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({id}, 'slaptas dalykas', {
        expiresIn: maxAge
    })
}

const handleErrors = (err) => {
    let errors = {email: '', password: ''}
    if (err.code === 11000) {
        errors.email ='Šis el. paštas yra jau užregistruotas.'
        return errors
    }

    if (err.message === 'Incorrect email') {
        errors.email = 'Šis el. paštas nėra užregistruotas.'
    }

    if (err.message === 'Incorrect password') {
        errors.password = 'Neteisingas slaptažodis.'
    }

    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}

module.exports.signup_get = (req, res) => {
    res.render('signup')
}

module.exports.login_get = (req, res) => {
    res.render('login')
}

module.exports.signup_post = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.create({email, password})
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({user: user._id})
    } catch (err) {
        const errors = handleErrors(err)
        res.status(404).json({errors})
    }
}

module.exports.login_post = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(200).json({user: user._id})
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}

module.exports.logout_get = async (req, res) => {
    res.cookie('jwt', '', {maxAge: 1}) // Pakeiciame JWT i tuscia eilute vienai milisekundei
    res.redirect('/')
}
