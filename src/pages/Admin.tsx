import { Route, Routes } from 'react-router-dom';
import AdminLayout from '../components/Admin/AdminLayout';
import Dashboard from '../components/Admin/Dashboard';
import ManageUsers from '../components/Admin/ManageUsers';
import ManageSongs from '../components/Admin/ManageSongs';
import NotFound from '../components/NotFound';

const Admin = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<ManageUsers />} />
        <Route path="/songs" element={<ManageSongs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AdminLayout>
  );
};

export default Admin;
