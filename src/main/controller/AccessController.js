const UserService = require("../service/UserService")
const customErrors = require("../helpers/customErrors");
const { enumHelpers } = require("../helpers");
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
                if (!user || !user._id)
                    return sendResponseToClient(customErrors.auth.accessDenied);
                
                const { rule, status } = await UserService.findById(user._id);
                
                if (target === rule || rule === enumHelpers.users.rules.manager) next();
                else return sendResponseToClient(customErrors.auth.unauthorized);

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