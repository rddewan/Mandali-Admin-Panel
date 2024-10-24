export interface GuildDto {
    status: string,
    data: Guild[],
}

export interface Guild {
    id: number,
    name: string
}