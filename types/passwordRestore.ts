export interface IUpdateUserPasswordFx {
  password: string
  email: string
}

export interface IVerifyCodeFx {
  code: number
  codeId: string
}

export interface IPasswordRestoreInputs {
  password: string
  passwordRepeat: string
}
