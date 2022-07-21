// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import {
  getFirestore,
  doc,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2DQ1uKfvYaOSlB_sHMRE8-pcf7joGYU4",
  authDomain: "fir-javascript-crud-349fd.firebaseapp.com",
  projectId: "fir-javascript-crud-349fd",
  storageBucket: "fir-javascript-crud-349fd.appspot.com",
  messagingSenderId: "93588508015",
  appId: "1:93588508015:web:a7a030d1d5d5ac5d67ec9a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const saveTask = (title, description) => {
  addDoc(collection(db, "tasks"), { title, description });
};
export const getTasks = () => {
  return getDocs(collection(db, "tasks"));
};
export const onTasksChange = (cb) => {
  onSnapshot(collection(db, "tasks"), cb);
};
export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));
export const getTask = (id) => getDoc(doc(db, "tasks", id));
export const updateTask = (id, title, description) =>
  updateDoc(doc(db, "tasks", id), { title, description });
