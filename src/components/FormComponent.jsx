import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { handleAddTool, handleAddCategory} from '.';
import { useState, useEffect } from 'react';
import { collection, onSnapshot  } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';

const FormComponent = () => {

  const [categoryFromFirebase, setCategoryFromFirebase] = useState([])

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "category"), (querySnapshot) => {
      const c = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategoryFromFirebase(c);
    });

    return () => unsubscribe();
  }, []);


  const [_name, setName] = useState('')
  const [_code, setCode] = useState('')
  const [_description, setDescription] = useState('')
  const [_category, setCategory] = useState('')

  const data = {
    name: _name,
    link: _code,
    description: _description,
    category: _category
  }

  const [_newCategory, setNewCategory] = useState('')

  async function handleSubmit1(e) {
    e.preventDefault()

    if (!_name || !_code || !_description || !_category) {
      window.alert('Please fill out all fields.')
      return
    }
  
    await handleAddTool(data)

    setName('')
    setCode('')
    setDescription('')
  }

  async function handleSubmit2(e) {
    e.preventDefault()

    if(!_newCategory) {
      window.alert('Please fill out field.')
      return
    }

    await handleAddCategory(_newCategory)

    setNewCategory('')
  }

  return (
    <section className="form__container">

      <div className="form__wrapper1">
        <Form onSubmit={handleSubmit1}>
          
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" onChange={e => setName(e.target.value)} value={_name} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>URL/Code</Form.Label>
            <Form.Control as="textarea" rows={1} onChange={e => setCode(e.target.value)} value={_code} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={e => setDescription(e.target.value)} value={_description} />
          </Form.Group>

          <Form.Select aria-label="Default select example" onChange={e => setCategory(e.target.value)}>
            {
              (categoryFromFirebase != 0) ? categoryFromFirebase.map((item) => (
                <option key={item.id} value={item.category_name}>{item.category_name}</option>
              )) : <option value={null}>No Category yet</option>
            }
          </Form.Select>

          <Button variant="primary" type='submit' className='btn1'>Add</Button>
        </Form>
      </div>

      <div className="form__wrapper2">
        <Form onSubmit={handleSubmit2}>
          <Form.Group className="mb-3">
            <Form.Label>New Category</Form.Label>
            <Form.Control type="text" onChange={e => setNewCategory(e.target.value)} value={_newCategory} />
          </Form.Group>
          <Button variant="primary" type='submit' className='btn2'>Add</Button>

          <Form.Group className="mb-3">
            <Form.Label>Delete/Edit Category</Form.Label>
            <Form.Control type="text" value={_category} />
          </Form.Group>
          <Button variant="secondary" className='btn2'><i className="fa-solid fa-pen-to-square"></i></Button>
          <Button variant="danger" className='btn2'><i className="fa-solid fa-trash"></i></Button>
        </Form>
      </div>

    </section>
  )
}

export default FormComponent
