import React, { useState, useEffect } from 'react';
import {
  addNewTask,
  getTasks,
  updateTask,
  deleteTask,
} from '../../firebase/taskController';

const TaskList = () => {
  const [task, setTask] = useState({ title: '', description: '' });
  const [tasks, setTasks] = useState([]);
  const [mode, setMode] = useState('add');
  const initializeTasks = () => {
    getTasks()
      .then((t) => setTasks([...t]))
      .catch((err) => console.log(err));
  };

  const createNewTask = async () => {
    await addNewTask(task);
    setTask({ title: '', description: '' });
    initializeTasks();
  };

  const editTask = (id) => {
    setMode('update');
    const taskToEdit = tasks.find((t) => t.id === id);
    setTask({ ...taskToEdit });
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    initializeTasks();
  };

  const updateExistingTask = async () => {
    await updateTask(task);
    setTask({ title: '', description: '' });
    initializeTasks();
    setMode('add');
  };

  useEffect(() => {
    initializeTasks();
  }, []);
  return (
    <div>
      <h1 className='text-sky-700 font-semibold text-lg'>
        Estàs en la tasklist
      </h1>
      <div className='flex flex-col gap-4 '>
        <h2>Introduce una nueva tarea</h2>
        <input
          className='border shadow outline-none focus:ring ring-sky-200 rounded px-2 py-1 w-full'
          type='text'
          value={task.title}
          placeholder='Titulo'
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
        <textarea
          rows='3'
          className='border shadow outline-none focus:ring ring-sky-200 rounded px-2 py-1 w-full'
          type='text'
          value={task.description}
          placeholder='Description'
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        ></textarea>
        <button
          className='bg-sky-400 text-white rounded shadow py-1 hover:bg-sky-500 transition font-semibold'
          onClick={() =>
            mode === 'add' ? createNewTask() : updateExistingTask()
          }
        >
          {mode === 'add' ? 'Añadir' : 'Update'}
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
        {tasks.map((task) => (
          <div
            className='rounded-lg border border-sky-300 p-4 flex flex-col gap-2'
            key={task.id}
          >
            <h1 className='font-semibold'>{task.title}</h1>
            <div className='border-t border-sky-300'></div>
            <p>{task.description}</p>
            <div className='flex justify-between '>
              <button
                className='bg-sky-400 text-white py-1 px-2 rounded'
                onClick={() => editTask(task.id)}
              >
                Editar
              </button>
              <button
                className='bg-red-400 text-white px-1 py-2 rounded'
                onClick={() =>
                  window.confirm('¿Seguro que quieres eliminar esta tarea?') &&
                  removeTask(task.id)
                }
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
