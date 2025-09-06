import {ReactNode} from 'react'
type layoutProps = {
    children:ReactNode,
    post:ReactNode
}
const layout = ({children,post}:layoutProps) => {
  return (
    <div>
        {children}
        {post}
    </div>
  )
}

export default layout