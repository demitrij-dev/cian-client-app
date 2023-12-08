import axios from "axios";

class Auth{
    // async reg(email: string, password: string){
    //     axios.post('http://localhost:8080/server/registration', {email, password})
    //         .then(response => {
    //             console.log('Ответ от сервера:', response.data);
    //         })
    //         .catch(error => {
    //             console.error('Ошибка при отправке запроса:', error);
    //         });
    // }
    async login(email: string, password: string){
        if(!email) throw "Заполните почту"
        if(!password) throw "Заполните пароль"

        return await axios.post('http://localhost:8080/server/login', {email, password})
            .then(response => {
                return response.data
            })
            .catch(error => {
                console.error(error.data)
            })
    }
}
export default new Auth()