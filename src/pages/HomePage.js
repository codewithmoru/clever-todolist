import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

import Days from '../components/Days';
import TaskList from '../components/TaskList';
import './homepage.css';
import { auth, database } from '../sources/firebase';
import HomepageHeader from '../components/HomepageHeader';

function HomePage() {
  const [activeUser, setActiveUser] = useState('');
  const [tasks, setTasks] = useState([]);
  const [pickedDate, setPickedDate] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setLoading(true);
      if (user) {
        onValue(ref(database, `${auth.currentUser.uid}`), (snapshot) => {
          setTasks([]);
          setLoading(false);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((element) => {
              setTasks((oldArr) => [...oldArr, element]);
              return element;
            });
          }
        });
        setActiveUser(auth.currentUser.email);
      } else if (!user) {
        navigate('/');
      }
    });
  }, [navigate, pickedDate]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch(() => navigate('/homepage'));
  };
  return (
    <div className='homepage'>
      <HomepageHeader activeUser={activeUser} handleSignOut={handleSignOut} />
      <Days tasks={tasks} setPickedDate={setPickedDate} />
      <TaskList tasks={tasks} loading={loading} />
    </div>
  );
}

export default HomePage;
