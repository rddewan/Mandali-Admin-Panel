import { axiosAdminInstance } from "../../../../../../../core";
import { RoleDto } from "../dto/role.dto";
import { UpdateUserRoleDto } from "../dto/update-user-role.dto";


export const getRoles = async () => {
  const response = await axiosAdminInstance.get<RoleDto>("/api/v1/admin/roles");
  return response.data;
};

export const setUserRole = async (data: UpdateUserRoleDto) => {
  const response = await axiosAdminInstance.post<RoleDto>(
    "/api/v1/admin/users/set-user-role",
    data
  );
  return response.data;
};

export const deleteUserRole = async (data: UpdateUserRoleDto) => {
    const response = await axiosAdminInstance.delete<RoleDto>(
      `/api/v1/admin/users/delete-user-role`,
      { params: data }
    );
    return response.data;
  };
