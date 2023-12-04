import axios from "axios";

class Auth{
    async reg(email: string, password: string){
        axios.post('http://localhost:8080/server/registration', {email: email, password: password})
            .then(response => {
                console.log('Ответ от сервера:', response.data);
            })
            .catch(error => {
                console.error('Ошибка при отправке запроса:', error);
            });
    }
    async login(email: string, password: string){
        axios.post('http://localhost:8080/server/login', {email: email, password: password})
            .then(response => {
                console.log('Ответ от сервера:', response.data);
            })
            .catch(error => {
                console.error('Ошибка при отправке запроса:', error);
            });
    }
}
export default new Auth()