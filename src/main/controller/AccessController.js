const customErrors = require("../helpers/customErrors");
const { decodeToken } = require('../utils/TokenUtil');

const responseBuilder = (res) => (responsePayload) => 
  res.status(responsePayload.statusCode).send(responsePayload)

module.exports = class AccessController{
    constructor(rule){
        const target = rule;
        this.verify = async (req, res, next) => {
            const sendResponseToClient = responseBuilder(res);
            const token = req.headers['x-access-token'];
            if (!token) return sendResponseToClient(customErrors.auth.tokenNotProvided);

            try {
                const { user, iat } = decodeToken(token);
                console.log("user" + JSON.stringify(user))
                if (!user || !user._id)
                    return sendResponseToClient(customErrors.auth.accessDenied);
                
                
            } catch (error) {
                global.logger.error(error.name + ' ' + error.message)
                switch (error.name) {
                    case "JsonWebTokenError":
                        return sendResponseToClient(customErrors.auth.invalidToken);
                    case "TokenExpiredError":
                        return sendResponseToClient(customErrors.auth.expiredToken);
                    default:
                        return sendResponseToClient(customErrors.auth.errorOnValidateToken);
                }
            }
        }
    }
}