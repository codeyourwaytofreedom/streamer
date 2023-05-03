import Layout from '../components/Layout'
import type { ReactElement } from 'react'


const With_Layout = () => {
    return ( 
        <div>
            This page uses Layout
        </div>
     );
}
 
export default With_Layout;

With_Layout.getLayout = function getLayout(page:ReactElement) {
    return (
      <Layout>
        {page}
      </Layout>
    )
  }