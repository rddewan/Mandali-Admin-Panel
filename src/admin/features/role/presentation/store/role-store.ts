import { create } from "zustand";
import { RoleState } from "../state/role-state";
import {
  deleteUserRole,
  getRoles,
  setUserRole,
  UpdateUserRoleDto,
} from "../../data";
import { createSelectors } from "../../../../../core";

const useRoleStore = create<RoleState>((set) => ({
  isLoading: false,
  roles: [],
  isRoleDeleted: null,
  isRoleAdded: null,
  error: null,
  selectedRole: null,
  setSelectedRole: (role: string | null) => set({ selectedRole: role }),
  getRoles: async () => {
    try {
      // update state before api call
      set({
        isLoading: true,
        error: null,
        selectedRole: null,
        isRoleDeleted: null,
        isRoleAdded: null,
      });
      // make api call
      const roles = await getRoles();
      // update state after api call
      set({ roles: roles.data, isLoading: false, error: null });
    } catch (error) {
        // update error state after api call
      const errorMessage = (error as Error).message;
      set({ roles: [], isLoading: false, error: errorMessage });
    }
  },
  setUserRole: async (userRole: UpdateUserRoleDto, selectedRole: string) => {
    try {
        // update state before api call
      set({
        isLoading: true,
        error: null,
        selectedRole: selectedRole,
        isRoleAdded: null,
      });
      // make api call
      await setUserRole(userRole);
      // update state after api call
      set({
        isLoading: false,
        error: null,
        selectedRole: null,
        isRoleAdded: true,
      });
    } catch (error) {
        // update error state after api call
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage, selectedRole: null });
    }
  },
  deleteUserRole: async (data: UpdateUserRoleDto) => {
    try {
        // update state before api call
      set({ isLoading: true, error: null, isRoleDeleted: null });
      // make api call
      await deleteUserRole(data);
      // update state after api call
      set({ isLoading: false, error: null, isRoleDeleted: true });
    } catch (error) {
        // update error state after api call
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
}));

export default createSelectors(useRoleStore);
