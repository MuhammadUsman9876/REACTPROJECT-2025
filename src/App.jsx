import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import MainLayout from './Layouts/MainLayout';
import JobsPage from './Pages/JobsPage';
import NotFoundPage from './Pages/NotFoundPage';
import JobPage, { jobLoader } from './Pages/JobPage';
import AddJobPage from './Pages/AddJobPage';
import EditJobPage from './Pages/EditJobPage';

const App = () => {
  // ✅ Improved Add Job Function
  const addJob = async (jobData) => {
    try {
      const res = await fetch('api/jobs', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      if (!res.ok) throw new Error('Failed to add job');

      const data = await res.json();  
      return data;
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  // ✅ Improved Delete Job Function
  const deleteJob = async (id) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, {  // 🔹 Use full URL in development
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete job');
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };
  //Update Job
  const updateJob = async (job) => {
    try {
      const res = await fetch(`/api/jobs/${job.id}`, {  // ✅ Fixed API URL
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(job),
      });
  
      if (!res.ok) throw new Error('Failed to update job');
  
      const data = await res.json();  // ✅ Parse response
      return data;  // ✅ Return updated job data
    } catch (error) {
      console.error('Error updating job:', error);
      return null;  // ✅ Return null on failure
    }
  };
  

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />, // Wrap pages with MainLayout
      children: [
        { index: true, element: <Homepage /> }, // Renders at "/"
        { path: '/jobs', element: <JobsPage /> },
        { path: '/add-job', element: <AddJobPage addJobSubmit={addJob} /> },  // ✅ Pass function correctly
        { path: '/edit-job/:id', element: <EditJobPage updatedJobSubmit={updateJob} />, loader: jobLoader },
        { path: '/jobs/:id', element: <JobPage deleteJob={deleteJob} />, loader: jobLoader },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
