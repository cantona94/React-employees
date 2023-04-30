const login = async (req, res) => {
    res.send('login');
}

const register = async (req, res) => {
    res.send('register');
}

const current = async (req, res) => {
    res.send('current');
}

module.exports = {
    login,
    register,
    current
}
