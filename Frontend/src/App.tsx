import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext'
import PrivateRoute from './routes/PrivateRoutes';

import Login from './views/login';
import Register from './views/register';
import HomePage from './views/home';
import AdminPage from './views/admin';
import { Layout } from './components';
import MoviePage from './views/movie';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/' element={<Layout />}>
            <Route index element={<PrivateRoute roles={[1, 2, 3]}><HomePage /></PrivateRoute>} />
            <Route path="movie/:id?" element={<PrivateRoute roles={[1, 2, 3]}><MoviePage /></PrivateRoute>} />
          </Route>
          <Route path="/admin" element={<PrivateRoute roles={[3]}><AdminPage /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
