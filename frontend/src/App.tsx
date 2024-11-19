
import './App.css';
import LoginPage from './components/LoginPage';

export default function Home() {

//if user not logged in show unauth page, else show logged in page

  return (
      <div>
        Welcome to BlogIt!
        <div>
          <LoginPage/>
        </div>
      </div>
  )
}


