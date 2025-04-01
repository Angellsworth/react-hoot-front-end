// src/components/CommentForm/CommentForm.jsx
import { useState } from 'react';

const CommentForm = (props) => {
  const [formData, setFormData] = useState({ text: '' });

  const handleChange = (event) => {
    //this is overkill with spreading in formData but it is scalable
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // add handleAddComment
    setFormData({ text: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='text-input'>Your comment:</label>
      <textarea
        required
        type='text'
        name='text'
        id='text-input'
        value={formData.text}
        onChange={handleChange}
      />
      <button type='submit'>SUBMIT COMMENT</button>
    </form>
  );
};

export default CommentForm;

