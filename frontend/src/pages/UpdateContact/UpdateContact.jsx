import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './UpdateContact.module.css';

function UpdateContact() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    state: '',
    city: '',
    street: '',
    zipCode: '',
    typeContact: '',
  });

  useEffect(() => {
    const fetchContact = async () => {
      const { data } = await axios.get(`/api/contacts/${id}`);
      setForm({
        firstName: data.name.firstName,
        lastName: data.name.lastName,
        email: data.email,
        phone: data.phone,
        state: data.address.state,
        city: data.address.city,
        street: data.address.street,
        zipCode: data.address.zipCode,
        typeContact: data.typeContact,
      });
      setLoading(false);
    };
    fetchContact();
  }, [id]);

  const handleChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedContact = {
      name: {
        firstName: form.firstName,
        lastName: form.lastName,
      },
      email: form.email,
      phone: form.phone,
      address: {
        state: form.state,
        city: form.city,
        street: form.street,
        zipCode: form.zipCode,
      },
      typeContact: form.typeContact,
    };
    try {
      const response = await axios.put(`/api/contacts/${id}`, updatedContact);
      if (response.status === 200) {
        navigate('/');
      } else {
        setError('Something went wrong');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Paper className={styles.container} elevation={2}>
          <h2>Update Contact</h2>
          <form autoComplete='off' onSubmit={handleUpdate}>
            <div className={styles.formGroup}>
              <div>
                <FormControl fullWidth>
                  <TextField
                    required
                    name='firstName'
                    value={form.firstName}
                    label='First Name'
                    onChange={handleChange}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl fullWidth>
                  <TextField
                    required
                    name='lastName'
                    value={form.lastName}
                    label='Last Name'
                    onChange={handleChange}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl fullWidth>
                  <TextField
                    required
                    name='email'
                    type='email'
                    value={form.email}
                    label='Email'
                    onChange={handleChange}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl fullWidth>
                  <TextField
                    required
                    name='phone'
                    value={form.phone}
                    label='Phone'
                    type='number'
                    onChange={handleChange}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl fullWidth>
                  <TextField
                    required
                    name='state'
                    value={form.state}
                    label='State'
                    onChange={handleChange}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl fullWidth>
                  <TextField
                    required
                    name='city'
                    value={form.city}
                    label='City'
                    onChange={handleChange}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl fullWidth>
                  <TextField
                    required
                    name='street'
                    value={form.street}
                    label='Street'
                    onChange={handleChange}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl fullWidth>
                  <TextField
                    inputProps={{ maxLength: 4 }}
                    required
                    name='zipCode'
                    value={form.zipCode}
                    type='number'
                    label='Zip Code'
                    onChange={handleChange}
                  />
                </FormControl>
              </div>
            </div>
            <div className={styles.select}>
              <FormControl fullWidth>
                <InputLabel id='typeContact'>Contact Type</InputLabel>
                <Select
                  required
                  labelId='typeContact'
                  name='typeContact'
                  value={form.typeContact}
                  label='Contact Type'
                  onChange={handleChange}
                >
                  <MenuItem value='Family'>Family</MenuItem>
                  <MenuItem value='Friend'>Friend</MenuItem>
                  <MenuItem value='Work'>Work</MenuItem>
                </Select>
              </FormControl>
            </div>
            <FormControl fullWidth>
              <Button
                type='submit'
                variant='contained'
                sx={{
                  bgcolor: '#01579b',
                  mt: '20px',
                  py: 1,
                  fontWeight: 'bold',
                }}
              >
                VALIDATE
              </Button>
            </FormControl>
          </form>
        </Paper>
      )}
    </>
  );
}

export default UpdateContact;
