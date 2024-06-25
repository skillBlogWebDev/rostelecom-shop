export interface IUploadUserAvatarFx {
  jwt: string
  formData: FormData
}

interface IBaseEditUser {
  jwt: string
  setEdit: (arg0: boolean) => void
}

export interface IEditUsernameFx extends IBaseEditUser {
  name: string
}

export interface IVerifyEmailFx {
  jwt: string
  email: string
}

export interface IEditUserEmailFx extends IBaseEditUser {
  code: number
  email: string
  codeId: string
}

export interface IVerifyCodeFx {
  code: number
  jwt: string
  codeId: string
}

export interface IProfileInfoActionsProps {
  spinner: boolean
  handleSaveInfo: VoidFunction
  disabled: boolean
  handleCancelEdit: VoidFunction
}

export interface IProfileInfoBlockProps {
  allowEdit: VoidFunction
  text: string
}

export interface ICodeInputProps {
  processInput: (
    arg0: React.ChangeEvent<HTMLInputElement>,
    arg1: number
  ) => void
  onKeyUp: (arg0: React.KeyboardEvent<HTMLInputElement>, arg1: number) => void
  index: number
  handlePushCurrentInput: (arg0: HTMLInputElement) => void
  num: string
  autoFocus: boolean
}

export interface IDeleteUserFx {
  jwt: string
  id: string
  handleLogout: VoidFunction
}
