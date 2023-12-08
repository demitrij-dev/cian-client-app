export interface IUserForm{
    email: string
    password: string

    name: string
    surname: string
    // phone: string
    city: string

    country: ICountry
}
export interface ICountry{
    name: string
    code: string
}

/*
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    name: {type: String},
    surname: {type: String},
    phone: {type: String},
    city: {type: String},
 */