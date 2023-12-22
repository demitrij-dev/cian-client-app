import axios from "axios";

class Auth{
    async login(email: string, password: string){
        if(!email) throw "Заполните почту"
        if(!password) throw "Заполните пароль"

        return await axios.post('https://cian-server-app.onrender.com/server/login', {email, password})
            .then(response => {
                return response.data
            })
            .catch(error => {
                console.error(error.data)
            })
    }
}
export default new Auth()
