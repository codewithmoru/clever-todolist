import React, { useState } from 'react';
import './tasklist.css';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import { set, ref, remove, update } from 'firebase/database';

import { auth, database } from '../sources/firebase';

import ProgressBar from './ProgressBar';

function TaskList({ tasks }) {
  const currentDay = dayjs();
  const [taskValue, setTaskValue] = useState('');
  const [taskDay, setTaskDay] = useState(currentDay.format('DD.MM.YYYY'));
  const [taskModal, setTaskModal] = useState(false);
  const [priority, setPrior] = useState('Low');
  const [updateValue, setUpdateValue] = useState({
    id: '',
    title: 'New Title',
    date: 'New Date',
    priority: 'High'
  });
  const [updateModal, setUpdateModal] = useState(false);

  const writeToDatabase = () => {
    const createId = uuidv4();
    set(ref(database, `${auth.currentUser.uid}/${createId}`), {
      id: createId,
      title: taskValue,
      fromDate: currentDay.format('DD.MM.YYYY'),
      date: taskDay,
      status: false,
      priority: priority
    });
    setTaskValue('');
    setPrior('Low');
    setTaskModal(false);
  };
  const handleOpenUpdateModal = ({ id, title, date, priority }) => {
    setUpdateValue({
      id: id,
      title: title,
      date: date,
      priority: priority
    });
    setUpdateModal(true);
  };
  const handleUpdate = (item) => {
    update(ref(database, `${auth.currentUser.uid}/${item.id}`), {
      title: item.title,
      date: item.date,
      priority: item.priority
    });
    setUpdateValue({
      title: 'New Title',
      date: 'New Date',
      priority: 'High'
    });
    setUpdateModal(false);
  };
  const handleDone = (status, id) => {
    update(ref(database, `${auth.currentUser.uid}/${id}`), { status: !status });
  };
  const handleDelete = (id) => {
    remove(ref(database, `${auth.currentUser.uid}/${id}`));
  };
  const handlePriority = (e) => setPrior(e.target.value);
  const handleClick = () => {
    setTaskModal(!taskModal);
  };

  return (
    <div className='tasks-wrapper'>
      <button className='add-btn' onClick={handleClick}>
        { !taskModal ? 'OPEN ADDING PANEL' : 'CLOSE ADDING PANEL' }
      </button>
      { taskModal && (
        <div className='task-modal'>
          <div className='modal-wrapper'>
            <div>
              <h4>Enter Your Task: </h4>
              <input
                type='text'
                value={taskValue}
                onChange={(e) => setTaskValue(e.target.value)}
              ></input>
              <h4>Enter Your Priority: </h4>
              <select onChange={handlePriority} defaultValue={priority}>
                <option value={'Low'}>Low</option>
                <option value={'Medium'}>Medium</option>
                <option value={'High'}>High</option>
              </select>
            </div>
            <div>
              <h4>Enter Your Date: </h4>
              <input
                type='text'
                value={taskDay}
                onChange={(e) => setTaskDay(e.target.value)}
              ></input>
            </div>
          </div>
          <button onClick={writeToDatabase}>Add Task</button>
        </div>
      ) }
      <div className='full-tasks'>
        <div className='tasks-arr'>
          <div className='tasks-arr-header'>
            <h3 className='tasks-arr-title'>{ tasks.length } Tasks To Update</h3>
            <div className='tasks-arr-header-table'>
              <h6>STATUS</h6>
              <h6>ADDING DATE</h6>
              <h6>DUE DATE</h6>
              <h6>PRIORITY</h6>
              <h6>USER</h6>
            </div>
            <div style={{ width: '300px', paddingRight: '10px', paddingLeft: '40px' }}>
              <h6>PREFERED ACTIONS:</h6>
            </div>
          </div>
          { tasks.length === 0 && <ProgressBar /> }
          { tasks.map((item, index) => {
            return (
              <div className='tasks-arr-item' key={item.id}>
                <h4 className='h-header'>
                  { index + 1 }. { item.title }
                </h4>
                <div className='tasks-arr-item-table'>
                  <h5> { item.status === true ? 'Done' : 'Undone' }</h5>
                  <h5> { item.fromDate }</h5>
                  <h5> { item.date }</h5>
                  <h5>{ item.priority }</h5>
                  <h5>{ auth.currentUser.email }</h5>
                </div>
                <div className='btns-area'>
                  <button className='done-btn' onClick={() => handleDone(item.status, item.id)}>
                    Done
                  </button>
                  <button className='del-btn' onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>
                  <button className='upd-btn' onClick={() => handleOpenUpdateModal(item)}>
                    Update
                  </button>
                  { updateModal && (
                    <div className='update-modal'>
                      <div className='upd-modal-wrapper'>
                        <div>
                          <h3>Enter Your New Task: </h3>
                          <input
                            type='text'
                            value={updateValue.title}
                            onChange={(e) =>
                              setUpdateValue({ ...updateValue, title: e.target.value })}
                          ></input>
                        </div>
                        <div>
                          <h3>Enter Your New Priority: </h3>
                          <select
                            onChange={(e) =>
                              setUpdateValue({ ...updateValue, priority: e.target.value })}
                            defaultValue={updateValue.priority}
                          >
                            <option value={'Low'}>Low</option>
                            <option value={'Medium'}>Medium</option>
                            <option value={'High'}>High</option>
                          </select>
                        </div>
                        <div>
                          <h3>Enter Your New Date: </h3>
                          <input
                            type='text'
                            value={updateValue.date}
                            onChange={(e) =>
                              setUpdateValue({ ...updateValue, date: e.target.value })}
                          ></input>
                        </div>
                        <div>
                          <button className='done-btn' onClick={() => handleUpdate(updateValue)}>
                            Update Task
                          </button>
                          <button className='del-btn' onClick={() => setUpdateModal(false)}>
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  ) }
                </div>
              </div>
            );
          }) }
        </div>
      </div>
    </div>
  );
}

export default TaskList;
