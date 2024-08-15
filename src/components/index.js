import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';

async function handleAddTool(d) {

  await addDoc(collection(db, "tools"), d)
  .then((docRef) => {
    window.alert("Successfully added new doc: "+docRef.id)
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
}

async function handleAddCategory(d) {
  await addDoc(collection(db, "category"), {
    category_name: d,
  })
  .then((docRef) => {
    window.alert("Successfully added new category: "+docRef.id)
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
}

async function handleDeleteTool(id) {
  try {
    await deleteDoc(doc(db, "tools", id));
    window.alert(`Document ID: ${id} successfully deleted`);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
}

async function handleDeleteCategory(id) {
  try {
    await deleteDoc(doc(db, "category", id));
    window.alert(`Document ID: ${id} successfully deleted`);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
}

async function handleEdit(index) {
  window.alert(index)
}

export {handleAddTool, handleAddCategory, handleDeleteTool, handleDeleteCategory, handleEdit}