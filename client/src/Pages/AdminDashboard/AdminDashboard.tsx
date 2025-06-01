




import React, { useState, useEffect, useContext } from 'react';
import { AdminLoginStatusContext } from '../../Context/LoginStatusProvider';
import { io } from 'socket.io-client';
import { getCookie } from '../../utils/cookies';
import { useLocation, useNavigate } from 'react-router-dom';
import './AdminDashboard.css'






const socket = io('http://3.15.232.45:3001');



interface AdminPanel {
  panel?:String;
}


const admin:AdminPanel = {
  panel: 'NEXT PLAY NATION ADMIN PANEL'
}






const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { logout } = useContext(AdminLoginStatusContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [allEvents, setAllEvents] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null); // ✅ New
  const [formData, setFormData] = useState({
    title: '',
    start: '',
    end: '',
    description: ''
  });




  const token = getCookie('adminToken');



  const fetchAll = async () => {
    const res = await fetch('http://3.15.232.45:3001/calendar/calendar-events');
    const data = await res.json();
    setAllEvents(data);
  };





  





  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://3.15.232.45:3001/auth/admin-authentication', {
          credentials: 'include',
        });
        const data = await res.json();
        if (!data.authenticated) {
          logout();
          navigate('/');
        } else {
          setIsAuthenticated(true);
        }
      } catch (_) {
        logout();
        navigate('/');
      }
    };
    checkAuth();

    
  }, []);






  useEffect(() => {
    const lastVisited = localStorage.getItem('lastRoute');
    if (lastVisited && lastVisited !== location.pathname) {
      navigate(lastVisited);
    }

    const authState = localStorage.getItem('isAuthenticated');
    if (authState === 'true') {
      setIsAuthenticated(true);
    }

    fetchAll();

    socket.on('calendarChange', () => {
      console.log('Received calendarChange from server');
      fetchAll();
    });

    return () => {
      socket.off('calendarChange');
      socket.disconnect();
    };
  }, []);







    // Client Side function  Logs client-side errors to the backend , Keeps the UI secure with a generic message.


    const AdminDashboardClientError = async (errorType:string, errorDetail: any) => {
      try {
        await fetch('http://3.15.232.45:3001/admin-dashboard-client-error', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: errorType,
            message: (errorDetail as Error)?.message || 'Unknown error',
            stack: (errorDetail as Error)?.stack || '',
            time: new Date().toISOString()
          })
        });

      }catch(err) {
        console.warn('Error sending log to server:', err);

      }
    };





  const handleAdd = async () => {
    if (!formData.start || !formData.end) {
      setErrorMessage('Please fill in all date fields');
      return;
    }

    const safeStart = new Date(formData.start);
    const safeEnd = new Date(formData.end);

    if (isNaN(safeStart.getTime()) || isNaN(safeEnd.getTime())) {
      setErrorMessage('Invalid date format. Please use the datetime picker.');
      return;
    }

    try {
      await fetch('http://3.15.232.45:3001/calendar/create-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          start: safeStart.toISOString(),
          end: safeEnd.toISOString(),
          description: formData.description,
        }),
      });

      setFormData({ title: '', start: '', end: '', description: '' });
      setErrorMessage('');
      socket.emit('calendarChange');
    } catch (err) {
      await AdminDashboardClientError('Add Event Failed', err);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };





  const handleUpdate = async () => {
    if (!editingId) return;

    try {
      await fetch(`http://3.15.232.45:3001/calendar/update-event/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          start: new Date(formData.start).toISOString(),
          end: new Date(formData.end).toISOString(),
          description: formData.description,
        }),
      });

      setEditingId(null);
      setFormData({ title: '', start: '', end: '', description: '' });
      setErrorMessage('');
      socket.emit('calendarChange');
      fetchAll();
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to update event');
    }
  };




  const handleDelete = async (id: string) => {
    await fetch(`http://3.15.232.45:3001/calendar/delete-event/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
    socket.emit('calendarChange');
    fetchAll();
  };




  const adminLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://3.15.232.45:3001/logout/admin-logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      const data = await response.json();
      if (response.status === 200) {
        logout();
        setIsAuthenticated(false);
        localStorage.setItem('isAuthenticated', 'false');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('lastRoute');
        setTimeout(() => navigate('/'), 300);
        setErrorMessage(data.message || 'Admin Has Logged Out');
      } else {
        setErrorMessage(data.message || 'Admin Logout Failed. Please try again.');
      }
    } catch (error) {
      await AdminDashboardClientError('Add Event Failed', error);
      setErrorMessage('Admin Logout Failed. Please try again');
    }
  };








  


  return (
    <>
        <div className='w-screen overflow-hidden p-10 custom-admin-dashboard-container '>
          <div className=' flex items-center justify-center mx-auto max-w-[800px]'>
          <div className=' sm:text-lg md:text-lg lg:text-3xl xl:text-3xl font-sans font-bold'><h3>{admin.panel}</h3></div>
          </div>
        </div>



      <div className="p-5">
        <h1 className="sm:text-lg md:text-xl lg:text-xl xl:text-xl mb-2 font-bold">Manage Events</h1>

        <input
          className="border p-2 m-1 hover:cursor-pointer"
          name="title"
          value={formData.title}
          placeholder="Title"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          className="border p-2 m-1 hover:cursor-pointer"
          name="start"
          value={formData.start}
          type="datetime-local"
          onChange={(e) => setFormData({ ...formData, start: e.target.value })}
        />
        <input
          className="border p-2 m-1 hover:cursor-pointer"
          name="end"
          value={formData.end}
          type="datetime-local"
          onChange={(e) => setFormData({ ...formData, end: e.target.value })}
        />
        <input
          className="border p-2 m-1 hover:cursor-pointer"
          name="description"
          value={formData.description}
          placeholder="Add Note"
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />

        <button className="bg-green-500 text-white p-2 m-1 hover:bg-green-700" onClick={editingId ? handleUpdate : handleAdd} >      
               {editingId ? 'Update Event' : 'Add Event'}
        </button>



        <ul className="mt-4">
          {allEvents.map((event: any) => (
            <li key={event._id} className="flex flex-col bg-gray-100 p-2 my-1">
              <span>
                <strong>{event.title}</strong> | {new Date(event.start).toLocaleString()}
              </span>
              {event.description && (
                <span className="text-sm text-gray-600">Note: {event.description}</span>
              )}

              <div className="flex gap-2 mt-1">
                <button className="bg-red-500 text-white w-[21%] px-2 hover:bg-black" onClick={() => handleDelete(event._id)} >
                        Delete
                </button>

                <button className="bg-blue-500 text-white px-2 w-[21%] hover:bg-yellow-500"  onClick={() => { setEditingId(event._id);
                    setFormData({ title: event.title, start: new Date(event.start).toISOString().slice(0, 16),
                      end: new Date(event.end).toISOString().slice(0, 16),
                      description: event.description || '',
                    });
                  }} > 
                    Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>



      <div className="w-screen overflow-hidden flex justify-center">
        <form onSubmit={adminLogout}>
          <button className="bg-yellow-400 text-white p-3 w-[80%] hover:bg-green-500" type="submit">  Admin Logout  </button>
               <div>{errorMessage && <div>{errorMessage}</div>}</div>
        </form>
      </div>



    </>
  );
};



export default AdminDashboard;