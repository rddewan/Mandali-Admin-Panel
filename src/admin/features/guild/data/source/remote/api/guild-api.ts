import { GuildDto, UpdateUserGuildDto } from "../../../index";
import { axiosAdminInstance } from "../../../../../../../core";

export const getGuilds = async () => {
  const response = await axiosAdminInstance.get<GuildDto>("/api/v1/guilds");
  return response.data;
};

export const setUserGuild = async (data: UpdateUserGuildDto) => {
  const response = await axiosAdminInstance.post<GuildDto>(
    "/api/v1/admin/users/set-user-guild",
    data
  );
  return response.data;
};

export const deleteUserGuild = async (data: UpdateUserGuildDto) => {
    const response = await axiosAdminInstance.delete<GuildDto>(
      "/api/v1/admin/users/delete-user-guild",
      { params: data }
    );
    return response.data;
  };
