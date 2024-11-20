
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import UnAuthorizedPage from './unauthorized/App';
import AuthorizedPage from './authorized/App';

export default function Home() {

//if user not logged in show unauth page, else show logged in page

  return (
      <Router>
        <Routes>
          <Route path="/" element={<UnAuthorizedPage/>}/>
          <Route path="/authorized" element={<AuthorizedPage />}/>
        </Routes>
      </Router>
  )
}


