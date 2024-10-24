import { Member, MemberDetail } from "../../data";


export type MemberState = {
    members: Member[],   
    member?: MemberDetail, 
    isLoading: boolean,
    isMemberDeleted: boolean | null,
    error: string | null,
    deleteSnackbarOpen: boolean,
    setDeleteMemberSnackbarOpen: (value: boolean) => void,
    getMembersByChurch: () => Promise<void>,
    getMembersById: (id: number) => Promise<void>,
    deleteMember: (id: number) => Promise<void>,
    setMemberDeleted: (value: boolean) => void,
    reset: () => void
}