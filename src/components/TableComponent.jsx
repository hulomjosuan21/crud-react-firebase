import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import { collection, onSnapshot  } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { handleDeleteTool } from '.';
import Form from 'react-bootstrap/Form';

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

  const [showTool, setShowTool] = useState({});
  const handleShow = (d) => {
    setShowTool(d)
    setShow(true);
  };

  const [modalEditShow, setModalEditShow] = useState(false);

  const [toEditTool, setToEditTool] = useState({})
  const handleEdit = (item) => {
    setToEditTool(item);
    setModalEditShow(true);
  }

  return (
    <section className="table__container">
      
      <div className="table_wrapper">
        <Table striped bordered hover className='bootstrap-table'>
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
                  <td onDoubleClick={() => handleEdit(item)}>{item.name}</td>
                  <td>{item.link}</td>
                  <td>{item.description.length > 9 ? item.description.substring(0, 9) + '...' : item.description}</td>
                  <td>{item.category}</td>
                  <td className='controls-td'>
                    <div>
                      <Button variant="success" className='controls-btn' onClick={() => handleShow(item)}>
                        <i className="fa-solid fa-eye"></i>
                      </Button>
                      {/* <Button variant="secondary" className='controls-btn' onClick={() => setModalEditShow(true)} >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Button> */}
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
          <Modal.Title>{showTool.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{showTool.link}</p>
          <code>{showTool.description}</code>
          <p>{showTool.category}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={modalEditShow} onHide={() => setModalEditShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{toEditTool.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text"/>
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary"onClick={() => setModalEditShow(false)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  )
}

export default TableComponent