import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SearchProvider } from './context/SeachContext';
import Login from './pages/Login/Login.tsx';
import Dashboard from './pages/Dashboard/Dashboard.tsx';
import Users from './pages/Users/Users';
import UserDetails from './pages/UserDetails/UserDetails';
import NotFound from './pages/NotFound/NotFound.tsx';
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
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<UserDetails />} />

            
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </SearchProvider>
  );
}

export default App;
