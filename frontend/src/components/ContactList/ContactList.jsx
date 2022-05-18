import { Grid } from '@mui/material';
import ContactCard from '../ContactCard/ContactCard';

function ContactList({ data, onDelete }) {
  return (
    <>
      <Grid container spacing={2}>
        {data.map((contact, index) => (
          <Grid item md={4} key={index}>
            <ContactCard contact={contact} onDelete={onDelete} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default ContactList;
