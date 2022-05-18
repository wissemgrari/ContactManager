import ContactList from '../../components/ContactList/ContactList';
import styles from './Dashboard.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState('');

  useEffect(() => {
    const getContacts = async () => {
      const response = await axios.get('/api/contacts');
      if (response.status === 200) {
        const { data } = response;
        setData(data);
      } else {
        setErrors('Could not fetch the data');
      }
      setLoading(false);
    };

    getContacts();
  }, []);

  // Delete Contact
  const handleDelete = async (id) => {
    const contact = data.filter((contact) => contact._id === id);
    const name = contact[0].name.firstName + ' ' + contact[0].name.lastName;
    const choice = window.confirm(`Confirm Delete ${name} ?`);
    if (choice) {
      const res = await axios.delete(`/api/contacts/${id}`);
      //We should control the response status to decide if we will change the state or not.
      res.status === 204
        ? setData(data.filter((contact) => contact._id !== id))
        : alert('Error Deleting This Contact');
    }
  };

  return (
    <div className={styles.container}>
      {!loading ? (
        <ContactList data={data} onDelete={handleDelete} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Dashboard;
