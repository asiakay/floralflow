//import { useAnalytics } from '../hooks/useAnalytics';
import{ Analytics } from '@vercel/analytics/react'
;
import '../styles/globals.css'
import '@/styles/reset.css'; // Import the reset.css file

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { UserProvider } from '../contexts/UserContext';
import Layout from '../components/Layout';
function App({ Component, pageProps }) {
 // useAnalytics();

/*   const user = {
    name: 'Asia Kowalski',
    email: 'asiaktech@gmail.com',
  }; */

  return ( 
    <UserProvider>
    <Container fluid>

      <Layout>
    <Component {...pageProps} />
    <Analytics/>
    </Layout>
    </Container>
    </UserProvider>
    )
}

export default App;