import { axiosAdminInstance } from "../index";



const refreshToken = async (): Promise<boolean> => {

    const result = await axiosAdminInstance.post('/api/v1/auth/refresh-token')

    const statusCode = result.data.statusCode;

    if (statusCode === 200) {
        window.localStorage.setItem('isAuthenticated', 'true');
        return true;
    }
    else if (statusCode === 498) {
        window.localStorage.removeItem('isAuthenticated');
        return false;
    }

    return false;
}

export default refreshToken;