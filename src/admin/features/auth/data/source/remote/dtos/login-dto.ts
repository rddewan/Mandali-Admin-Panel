
export interface LoginResponse {
    status: string;
    data:   Data;
}

interface Data {
    token: Token;
    user:  User;
}

interface Token {
    access_token:  string;
    refresh_token: string;
}

interface User {
    id:          number;
    name:        string;
    email:       string;
    phoneNumber: null;
    photo:       null;
    role:        Role[];
    guild:       Guild[];
    church:      Church;
}

interface Church {
    id:       number;
    name:     string;
    timeZone: string;
}

interface Role {
    id:   number;
    name: string;
}

interface Guild {
    id:   number;
    name: string;
}