/* eslint-disable no-unused-vars */
import './App.css'
import FormComponent from './components/FormComponent'
import TableComponent from './components/TableComponent'
import { useState,useEffect } from 'react'
import { onSnapshot,collection } from 'firebase/firestore'
import { db } from './firebase/firebaseConfig'
import Spinner from 'react-bootstrap/Spinner';

const App = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tools"), (querySnapshot) => {
      const d = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(d);
    });

    return () => unsubscribe();
  }, [])

  return (
    <main>
      
      {/* {
        (!data.length != 0) ? <>
        <FormComponent/>
        <TableComponent/>
        </> : <div className='loading-container'><Spinner animation="border" /></div>
      } */}

      <FormComponent/>
      <TableComponent/>
    </main>
  )
}

export default App
