import { MembersDto, MemberDto } from "../../..";
import { axiosAdminInstance } from "../../../../../../../core";
import { DeleteMemberDto } from "../dto/delete-member.dto";





export const getMembersByChurch = async () => {
    const response = await axiosAdminInstance.get<MembersDto>('/api/v1/admin/users');
    return response.data;
}

export const getMemberById = async (id: number) => {
    const response = await axiosAdminInstance.get<MemberDto>(`/api/v1/admin/users/${id}`);
    return response.data;
}

export const deleteMember = async (id: number) => {
    const response = await axiosAdminInstance.delete<DeleteMemberDto>(`/api/v1/admin/users/${id}`);
    return response.data;
}
