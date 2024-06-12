export const parseData = async (filePath) => {
    const response = await fetch('http://localhost:5000/parse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ file_path: filePath }),
    });

    if (!response.ok) {
      throw new Error('--API.js-- Network response was not ok for parseData');
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
    throw new Error('--API.js-- Network response was not ok for file uploadFile');
  }

  return response.json();
};