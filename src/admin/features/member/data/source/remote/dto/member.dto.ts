export interface MemberDto {
  status: string;
  data: MemberDetail;
}

export interface MemberDetail {
  id: number;
  createAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  phoneNumber: null;
  photo: null;
  role: Role[];
  guild: Guild[];
  church: Church;
}

interface Role {
  id: number;
  name: string;
}

interface Guild {
  id: number;
  name: string;
}

interface Church {
  id: number;
  name: string;
  timeZone: string;
}
