/* eslint-disable no-unused-vars */
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import { collection, onSnapshot  } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { handleDeleteTool } from '.';

const TableComponent = () => {

  const [data, setData] = useState([])

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tools"), (querySnapshot) => {
      const d = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(d);
    });

    return () => unsubscribe();
  }, [])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <section className="table__container">
      
      <div className="table_wrapper">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Code/Links</th>
              <th>Description</th>
              <th>Category</th>
              <th>Controls</th>
            </tr>
          </thead>
          <tbody>
            {
              data && data.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.link}</td>
                  <td>{item.description}</td>
                  <td>{item.category}</td>
                  <td className='controls-td'>
                    <div>
                      <Button variant="secondary" className='controls-btn'>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Button>
                      <Button variant="danger" className='controls-btn' onClick={() => handleDeleteTool (item.id)}>
                        <i className="fa-solid fa-trash"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>A tool that helps you create smooth, layered CSS box shadows. It allows you to adjust parameters like transparency, distance, blur, and spread to generate the perfect shadow effect.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  )
}

export default TableComponent
