import { create } from "zustand";
import { MemberState } from "../state/member-state";
import { createSelectors } from "../../../../../core/zustand/selector";
import { deleteMember, getMemberById, getMembersByChurch } from "../../data";

const useMemberStore = create<MemberState>((set, get) => ({
  members: [],
  isLoading: false,
  isMemberDeleted: null,
  error: null,
  deleteSnackbarOpen: false,
  setDeleteMemberSnackbarOpen: (value: boolean) => {
    set({ deleteSnackbarOpen: value });
  },
  getMembersByChurch: async () => {
    try {
      set({ isLoading: true, error: null });
      const members = await getMembersByChurch();
      set({ members: members.data, isLoading: false, error: null });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ members: [], isLoading: false, error: errorMessage });
    }
  },
  getMembersById: async (id: number) => {
    try {
      set({ isLoading: true, error: null, isMemberDeleted: null });
      const member = await getMemberById(id);
      set({ member: member.data, isLoading: false, error: null });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
  deleteMember: async function (id: number) {
    try {
      set({ isLoading: true, error: null, isMemberDeleted: null });
      await deleteMember(id);
      set({ isMemberDeleted: true, isLoading: false, error: null });
      get().reset();
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
  setMemberDeleted: (value: boolean) => {
    set({ isMemberDeleted: value });
  },
  reset: () => {
    set({
      members: [],
    });
  },
}));

export default createSelectors(useMemberStore);
