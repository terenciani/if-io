const { verify, sign } = require('jsonwebtoken');

class TokenUtil {
    static async generateToken(user) {
        const jwt = global.config.jwt;
        return sign({ user }, jwt.secret, { expiresIn: jwt.expiresIn });
    }
    static decodeToken(token) {
        const jwt = global.config.jwt;
        const [_, tokenWithoutBearer] = token.split('Bearer').map(text => text.trim());
        return verify(tokenWithoutBearer, jwt.secret);
    }
}

module.exports = TokenUtil;