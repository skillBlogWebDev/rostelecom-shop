export interface IUser {
  _id: string
  name: string
  password: string
  email: string
  image: string
  role: string
}

export interface IUserGeolocation {
  features: [
    {
      properties: {
        city: string
        lon: number
        lat: number
      }
      bbox: [number, number, number, number]
    },
  ]
}

export interface ILoginCheckFx {
  jwt: string
  setShouldShowContent?: (arg0: boolean) => void
}
