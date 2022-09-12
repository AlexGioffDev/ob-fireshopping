import { db } from './index';
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { async } from '@firebase/util';
// Trabajamos con firebase y su firestore db para crear tasks

// CRUD - Create, Read, Update, Delete

// Create
export const addNewTask = async (task) => {
  await addDoc(collection(db, 'tasks'), task);
};

// Read
export const getTasks = async () => {
  // definir la referencia
  const querySnapshot = await getDocs(collection(db, 'tasks'));

  const tasks = querySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  return tasks;
};

// Update

export const updateTask = async (task) => {
  // console.log(task);
  await setDoc(doc(db, 'tasks', task.id), {
    title: task.title,
    description: task.description,
  });
};

export const deleteTask = async (id) => {
  await deleteDoc(doc(db, 'tasks', id));
};
