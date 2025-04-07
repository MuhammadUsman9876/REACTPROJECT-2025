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
  const API_BASE_URL = import.meta.env.VITE_API_URL;


  const addJob = async (jobData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });
  
      if (!res.ok) {
        throw new Error("Failed to add job");
      }
  
      const data = await res.json();
      if (!data) throw new Error("API returned an empty response");
  
      return data;  // Return the added job data
    } catch (error) {
      console.error("Error adding job:", error);
      toast.error("Failed to add job", { autoClose: 1000 });
    }
  };
  
  
  
  // ✅ Update Delete Job function
  const deleteJob = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/jobs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete job");
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };
  
  // ✅ Update Update Job function
  const updateJob = async (job) => {
    try {
      const res = await fetch(`${API_BASE_URL}/jobs/${job.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(job),
      });
      if (!res.ok) throw new Error("Failed to update job");
    } catch (error) {
      console.error("Error updating job:", error);
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
