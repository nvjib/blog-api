const supabase = require("../db")

const findUserByEmail = async (email) => {
    return await supabase
        .from("users")
        .select()
        .eq("email", email.toLowerCase())
}

const createUser = async ({ name, email, password, role }) => {
    return await supabase
        .from("users")
        .insert({ name, email: email.toLowerCase(), password, role })
        .select()
}

module.exports = {
    findUserByEmail,
    createUser
}