
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UnAuthorizedPage from './unauthorized/App';
import AuthorizedPage from './authorized/App';
import RegisterPage from './components/RegisterPage';

export default function Home() {

//if user not logged in show unauth page, else show logged in page

  return (
      <Router>
        <Routes>
          <Route path="/" element={<UnAuthorizedPage/>}/>
          <Route path="/authorized" element={<AuthorizedPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
        </Routes>
      </Router>
  )
}


