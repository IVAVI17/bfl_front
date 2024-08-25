// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [input, setInput] = useState('');
//   const [response, setResponse] = useState(null);
//   const [selectedOptions, setSelectedOptions] = useState([]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const parsedData = JSON.parse(input);
//       const res = await axios.post('https://holistic-viridian-periwinkle.glitch.me/bfhl', parsedData, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
//       setResponse(res.data);
//     } catch (error) {
//       console.error('Error submitting data:', error);
//       setResponse({ is_success: false, message: 'Failed to submit data' });
//     }
//   };

//   const handleSelectChange = (e) => {
//     const options = Array.from(e.target.selectedOptions, option => option.value);
//     setSelectedOptions(options);
//   };

//   const renderResponse = () => {
//     if (!response) return null;

//     const { numbers, alphabets, highest_lowercase_alphabet } = response;

//     return (
//       <div>
//         {selectedOptions.includes('Numbers') && (
//           <div>
//             <h3>Numbers:</h3>
//             <pre>{JSON.stringify(numbers, null, 2)}</pre>
//           </div>
//         )}
//         {selectedOptions.includes('Alphabets') && (
//           <div>
//             <h3>Alphabets:</h3>
//             <pre>{JSON.stringify(alphabets, null, 2)}</pre>
//           </div>
//         )}
//         {selectedOptions.includes('Highest lowercase alphabet') && (
//           <div>
//             <h3>Highest Lowercase Alphabet:</h3>
//             <pre>{JSON.stringify(highest_lowercase_alphabet, null, 2)}</pre>
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div>
//       <h1>BFHL Frontend</h1>
//       <form onSubmit={handleSubmit}>
//         <textarea
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder='Enter JSON here...'
//           rows="10"
//           cols="50"
//         />
//         <br />
//         <button type="submit">Submit</button>
//       </form>

//       <div>
//         <h3>Select what to display:</h3>
//         <select multiple={true} onChange={handleSelectChange}>
//           <option value="Numbers">Numbers</option>
//           <option value="Alphabets">Alphabets</option>
//           <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
//         </select>
//       </div>

//       {renderResponse()}
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedData = JSON.parse(input); // Parse the input JSON
      const res = await axios.post('https://holistic-viridian-periwinkle.glitch.me/bfhl', { data: parsedData.data }, {
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

  const handleSelectChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(options);
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_lowercase_alphabet } = response;

    return (
      <div>
        {selectedOptions.includes('Numbers') && numbers && (
          <div>
            <h3>Numbers:</h3>
            <pre>{JSON.stringify(numbers, null, 2)}</pre>
          </div>
        )}
        {selectedOptions.includes('Alphabets') && alphabets && (
          <div>
            <h3>Alphabets:</h3>
            <pre>{JSON.stringify(alphabets, null, 2)}</pre>
          </div>
        )}
        {selectedOptions.includes('Highest lowercase alphabet') && highest_lowercase_alphabet && (
          <div>
            <h3>Highest Lowercase Alphabet:</h3>
            <pre>{JSON.stringify(highest_lowercase_alphabet, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <h1>BFHL Frontend</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON here...'
          rows="10"
          cols="50"
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      <div>
        <h3>Select what to display:</h3>
        <select multiple={true} onChange={handleSelectChange}>
          <option value="Numbers">Numbers</option>
          <option value="Alphabets">Alphabets</option>
          <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
        </select>
      </div>

      {renderResponse()}
    </div>
  );
}

export default App;
