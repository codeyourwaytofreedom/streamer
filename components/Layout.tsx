import { ReactNode } from 'react'


interface LayoutProps {
    children: ReactNode
  }

const Layout = ({children}: LayoutProps) => {
    return ( 
            <>
            <h1>TOP Line: In every page</h1>
            {children}
            <h1>Bottom Line: In every page</h1>
            </>
     );
}
 
export default Layout;