import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Post from './components/Post';
import PostDetails from './components/PostDetails';
import AuthorDetails from './components/AuthorDetails';
import NotFoundPage from './components/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Post />} />
          <Route path='/post' element={<Post />} />
          <Route path='/post/:id' element={<PostDetails />} />
          <Route path='/authors/:id' element={<AuthorDetails />} />
          <Route path='/nosotros' element={<NotFoundPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
