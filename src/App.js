import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SearchProvider } from './context/SeachContext';
import Login from './pages/Login/Login.tsx';
import Dashboard from './pages/Dashboard/Dashboard.tsx';
import Users from './pages/Users/Users';
import UserDetails from './pages/UserDetails/UserDetails';
import NotFound from './pages/NotFound/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout/Layout';
import './index.css';

function App() {
  return (
    <SearchProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<UserDetails />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </SearchProvider>
  );
}

export default App;
