import { Card, Box, CardContent, CardActions } from '@mui/material';
import { Typography, Button, Divider } from '@mui/material';

import { FaEdit, FaTrashAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function ContactCard({ contact, onDelete }) {
  const color = {
    Friend: '#388e3c',
    Family: '#1565c0',
    Work: '#e91e63',
  };

  return (
    <Card sx={{ width: 400 }} elevation={2}>
      <Box
        py={1}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        {<FaUser color={color[contact.typeContact]} size={20} />}
        <Typography variant='h5' px={1}>
          {`${contact.name.firstName} ${contact.name.lastName}`}
        </Typography>
      </Box>
      <Divider />
      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', height: '120px' }}
      >
        <Typography pt={1} variant='p'>
          <b>Email: </b> {contact.email}
        </Typography>
        <Typography pt={1} variant='p'>
          <b>Phone: </b> {contact.phone}
        </Typography>
        <Typography pt={1} variant='p'>
          <b>Address: </b>{' '}
          {`${contact.address.state}, ${contact.address.city}, ${contact.address.street}`}
        </Typography>
        <Typography pt={1} variant='p'>
          <b>Zip Code : </b> {contact.address.zipCode}
        </Typography>
        <Typography py={1} variant='p'>
          <b>Created at: </b>{' '}
          {new Date(contact.createdAt).toLocaleString('en-GB')}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          pt: 4,
        }}
      >
        <Button
          variant='contained'
          sx={{ bgcolor: '#01579b', fontSize: '15px' }}
        >
          <Link to={`/update-contact/${contact._id}`}>
            <FaEdit />
            <Typography sx={{ marginLeft: '5px' }} variant='p'>
              EDIT
            </Typography>
          </Link>
        </Button>
        <Button
          onClick={() => onDelete(contact._id)}
          variant='contained'
          sx={{
            bgcolor: '#e91e63',
            fontSize: '15px',
            '&.MuiButtonBase-root:hover': {
              bgcolor: '#e91e63',
            },
          }}
        >
          <FaTrashAlt />
          <Typography sx={{ marginLeft: '5px' }} variant='p'>
            DELETE
          </Typography>
        </Button>
      </CardActions>
    </Card>
  );
}
