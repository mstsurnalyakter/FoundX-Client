import { ReactNode } from "react"


export const layoout = ({children}:{children:ReactNode}) => {
  return (
    <div>
        <h1>Profile</h1>
        {children}
    </div>
  )
}
