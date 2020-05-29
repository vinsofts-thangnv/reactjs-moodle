import axios from 'axios';

const clientAxios = (token: string = '97f6163af12984e3c7adcab4c993bc4e') => {
    const axiosBase = axios.create({
        baseURL: 'http://moodle.local/webservice/rest/server.php',
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    // console.log({ ...params, wstoken: token });
    return {
        get: (params: any) => axiosBase.get('', {
            params: { ...params, wstoken: token, moodlewsrestformat: 'json' }
        })
    }
}

export const xmlToJson = (xml: string) => {
}
export default clientAxios;