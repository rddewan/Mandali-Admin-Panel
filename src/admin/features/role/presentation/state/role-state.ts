import { Role, UpdateUserRoleDto } from "../../data";



export type RoleState = {
    isLoading: boolean;
    roles: Role[];
    error: string | null;
    selectedRole: string | null;
    isRoleDeleted: boolean | null,
    isRoleAdded: boolean | null,
    setSelectedRole: (role: string | null) => void;
    getRoles: () => Promise<void>;
    setUserRole: (userRole: UpdateUserRoleDto, selectedRole: string) => Promise<void>;
    deleteUserRole: (data: UpdateUserRoleDto) => Promise<void>;
}