// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Route, Routes } from 'react-router-dom';
import styles from './app.module.scss';
import WelcomePage from 'src/WelcomePage/WelcomePage';
import LoginPage from 'src/LoginPage/LoginPage';
import ProtectPage from 'src/ProtectPage/ProtectPage';
import RedirectPage from 'src/RedirectPage/RedirectPage';
import ProtectedRoute from 'src/ProtectedChatRoute/ProtectedChatRoute';
import './app.scss';
import ChatPage from 'src/ChatPage/ChatPage';

export function App() {
  return (
    <div>
      <h1> Welcome to chat app </h1> 
      <Routes>
        <Route path='/' element={<WelcomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/private' element={<ProtectPage/>}/>
        <Route path="/chats" element={<ChatPage/>} />
        <Route path='/oauth2/idpresponse' element={<RedirectPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
