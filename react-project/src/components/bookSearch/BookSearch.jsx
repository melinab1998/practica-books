import React from 'react'
import { Form } from 'react-bootstrap'

const BookSearch = ({ search, setSearch }) => {


    const handleChange = (e) => {
        setSearch(e.target.value);
    }


    return (
        <div>
            <Form.Group className='mb-3' controlId='searchBook'>
                <Form.Control type="text" placeholder='Buscar libro...' value={search} onChange={handleChange} />
            </Form.Group>
        </div>
    )
}

export default BookSearch;
