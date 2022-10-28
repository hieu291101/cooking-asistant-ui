import AuthService from "~/services/auth.service";

export const logOut = (refreshToken) => {
    AuthService.logout();
    AuthService.refreshToken(refreshToken);
};