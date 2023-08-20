import Login from '../pages/Login';
import Messages from '../pages/auth/Messages';
import Profile from '../pages/auth/Profile';
import Home from '../pages/auth/Home';
import Search from '../pages/auth/Search';
import CreatePost from '../components/CreatePost';


//dynamic routes
//need to go at the end of 
//same depth routes
export default [
    { path: '/', component: <Home/> },
    { path: '/login', component: <Login/> },
    { path: '/search', component: <Search/> },
    { path: '/search/:query', component:  <Search/>},
    { path: '/messages', component: <Messages/> },
    { path: '/create-post', component: <CreatePost/> },
    { path: '/:username', component: <Profile/> },
  ]