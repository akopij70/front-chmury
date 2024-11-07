// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Route, Routes } from 'react-router-dom';
import LoginPage from 'src/LoginPage/LoginPage';
import RedirectPage from 'src/RedirectPage/RedirectPage';
import './app.scss';
import ChatPage from 'src/ChatPage/ChatPage';

export function App() {
  return (
    <div>
      <h1> Welcome to chat app </h1> 
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path="/chats" element={<ChatPage/>} />
        <Route path='/oauth2/idpresponse' element={<RedirectPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
