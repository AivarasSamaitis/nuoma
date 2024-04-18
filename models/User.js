const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Prašau įvesti el. paštą.'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Prašau įvesti teisinga el. paštą.']
    },
    password: {
        type: String,
        required: [true, 'Prašau įvesti slaptažodį.'],
        minlength: [6, 'Slaptažodis turi būti sudarytas iš minimum 6 simbolių.']
    }
})

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// Statiskas metodas vartotojo prisijungimui
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email })
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user
        }
        throw Error('Neteisingas slaptažodis')
    }
    throw Error('Neteisingas el. paštas')
}

const User = mongoose.model('user', userSchema)

module.exports = User
