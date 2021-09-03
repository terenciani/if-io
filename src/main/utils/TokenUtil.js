const { verify, sign } = require('jsonwebtoken');

class TokenUtil {
    static async generateToken(user) {
        const jwt = global.config.jwt;
        return sign({ user }, jwt.secret, { expiresIn: jwt.expiresIn });
    }
    static decodeToken(token) {
        return verify(token, global.config.jwt.secret);
    }
}

module.exports = TokenUtil;