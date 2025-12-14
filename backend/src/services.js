import AuthService from "./services/authService.js";
import JwtService from "./services/jwtService.js";

const authService = new AuthService();
const jwtService = new JwtService();

export {
    authService,
    jwtService,
}