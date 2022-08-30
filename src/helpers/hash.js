const bcr = require('bcrypt')

async function securePassword(password) {
    try {
        const salt = await bcr.genSalt(9)
        const result = await bcr.hash(password, salt)
        return result
    } catch (error) {
        throw error
    }
}

module.exports = securePassword