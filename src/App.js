import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedData = JSON.parse(input);
      const res = await axios.post('https://holistic-viridian-periwinkle.glitch.me/bfhl', parsedData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setResponse(res.data);
    } catch (error) {
      console.error('Error submitting data:', error);
      setResponse({ is_success: false, message: 'Failed to submit data. Please check the JSON format.' });
    }
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions.map(option => option.value));
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers = [], alphabets = [], highest_lowercase_alphabet = [] } = response;

    return (
      <div>
        <h3>Filtered Response</h3>
        {selectedOptions.includes('Numbers') && numbers.length > 0 && (
          <div>
            <h4>Numbers:</h4>
            <pre>{numbers.join(', ')}</pre>
          </div>
        )}
        {selectedOptions.includes('Alphabets') && alphabets.length > 0 && (
          <div>
            <h4>Alphabets:</h4>
            <pre>{alphabets.join(', ')}</pre>
          </div>
        )}
        {selectedOptions.includes('Highest lowercase alphabet') && highest_lowercase_alphabet.length > 0 && (
          <div>
            <h4>Highest Lowercase Alphabet:</h4>
            <pre>{highest_lowercase_alphabet.join(', ')}</pre>
          </div>
        )}
      </div>
    );
  };

  const filterOptions = [
    { value: 'Numbers', label: 'Numbers' },
    { value: 'Alphabets', label: 'Alphabets' },
    { value: 'Highest lowercase alphabet', label: 'Highest lowercase alphabet' }
  ];

  return (
    <div>
      <h1>BFHL Frontend</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON here...'
          rows="5"
          cols="50"
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      <div>
        <h3>Multi Filter</h3>
        <Select
          isMulti
          options={filterOptions}
          onChange={handleSelectChange}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>

      {renderResponse()}
    </div>
  );
}

export default App;
