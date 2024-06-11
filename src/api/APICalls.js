export const parseLines = async (filePath) => {
    const response = await fetch('http://localhost:5000/parse/lines', {
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

export const parseTexts = async (filePath) => {
    const response = await fetch('http://localhost:5000/parse/texts', {
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

export const parseMistakes = async (filePath) => {
    const response = await fetch('http://localhost:5000/parse/mistakes', {
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

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('http://localhost:5000/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};
