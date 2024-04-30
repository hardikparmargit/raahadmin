// authService.js
import axios from 'axios';

const checkSession = async () => {
    try {
        await axios.post(`/session`);
        return true; // Session is valid
    } catch (error) {
        return false; // Session is invalid
    }
};

export default checkSession;
