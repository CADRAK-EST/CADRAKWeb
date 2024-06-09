// src/api.js
export const logFile = async (filePath) => {
    const response = await fetch('http://localhost:5000/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ file_path: filePath }),
    });
  
    if (!response.ok) {
      throw new Error('--API.js-- Network response was not ok');
    }
  
    return response.json();
  };
  