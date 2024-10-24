
export interface MembersDto {
    status: string;
    data:   Member[];
}

export interface Member {
    id:            number;
    createAt:      Date;
    updatedAt:     Date;
    name:          string;
    email:         string;
    passwordHash:  string;
    phoneNumber:   null;
    photo:         null;
    authType:      string;
    emailVerified: boolean;
    firebaseUID:   null;
    churchId:      number;
}
