const formatUser = user => {
    const modifiedUser = { ...user }
    delete modifiedUser.password
    delete modifiedUser.email
    delete modifiedUser.__v
    return { ...modifiedUser }
}

module.exports = formatUser