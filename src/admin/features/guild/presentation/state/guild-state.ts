import { Guild, UpdateUserGuildDto } from "../../data";


export type GuildState = {
    guilds: Guild[];
    isLoading: boolean;
    isGuildDeleted: boolean | null,
    isGuildAdded: boolean | null,
    error: string | null;
    selectedGuild: string | null;
    getGuilds: () => Promise<void>;
    setUserGuild: (data: UpdateUserGuildDto, selectedGuild: string) => Promise<void>;
    deleteUserGuild: (data: UpdateUserGuildDto) => Promise<void>;
}