// authService.js
import axios from 'axios';

const checkSession = async () => {
    try {
        await axios.post(`https://backend.raahgujarat.in/session`);
        return true; // Session is valid
    } catch (error) {
        return false; // Session is invalid
    }
};

export default checkSession;
