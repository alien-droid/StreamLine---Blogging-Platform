import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import MainPage from './components/MainPage';
import Login from './components/Login';
import Register from './components/Register';
import { UserContextProvider } from './UserContext';
import CreatePost from './components/CreatePost';
import PostPage from './components/PostPage';
import EditPost from './components/EditPost';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <UserContextProvider> 
    <ToastContainer autoClose={1500} theme='colored' style={{ display:'inline-block', fontSize: "15px", width:'20%'}}/>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />}
          />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/posts/:postId' element={<PostPage />} />
          <Route path='/edit/:postId' element={<EditPost/>} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
