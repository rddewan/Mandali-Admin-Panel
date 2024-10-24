import { create } from "zustand";
import { GuildState } from "../state/guild-state";
import {
  deleteUserGuild,
  getGuilds,
  setUserGuild,
  UpdateUserGuildDto,
} from "../../data";
import { createSelectors } from "../../../../../core";

const useGuildStore = create<GuildState>((set) => ({
  guilds: [],
  isLoading: false,
  isGuildDeleted: null,
  isGuildAdded: null,
  error: null,
  selectedGuild: null,
  getGuilds: async () => {
    try {
      // update state before api call
      set({
        isLoading: true,
        error: null,
        isGuildDeleted: null,
        selectedGuild: null,
        isGuildAdded: null,
      });
      // make api call
      const guilds = await getGuilds();
      // update state after api call
      set({ guilds: guilds.data, isLoading: false, error: null });
    } catch (error) {
      // update error state after api call
      const errorMessage = (error as Error).message;
      set({ guilds: [], isLoading: false, error: errorMessage });
    }
  },
  setUserGuild: async (data: UpdateUserGuildDto, selectedGuild: string) => {
    try {
        // update state before api call
      set({
        isLoading: true,
        error: null,
        selectedGuild: selectedGuild,
        isGuildAdded: null,
      });
      // make api call
      await setUserGuild(data);
      // update state after api call
      set({
        isLoading: false,
        error: null,
        selectedGuild: null,
        isGuildAdded: true,
      });
    } catch (error) {
      // update error state after api call
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage, selectedGuild: null });
    }
  },
  deleteUserGuild: async (data: UpdateUserGuildDto) => {
    try {
        // update state before api call
      set({ isLoading: true, error: null, isGuildDeleted: null });
      // make api call
      await deleteUserGuild(data);
      // update state after api call
      set({ isLoading: false, error: null, isGuildDeleted: true });
    } catch (error) {
      // update error state after api call
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
}));

export default createSelectors(useGuildStore);
