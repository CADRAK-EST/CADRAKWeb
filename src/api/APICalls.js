export const parseData = async (filePath, onNewPage) => {
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

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let done = false;
  let buffer = '';

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    buffer += decoder.decode(value, { stream: true });

    let boundary = buffer.indexOf('\n');
    while (boundary !== -1) {
      const chunk = buffer.slice(0, boundary).trim();
      buffer = buffer.slice(boundary + 1);
      if (chunk) {
        try {
          const pageData = JSON.parse(chunk);
          console.log('Parsed page data:', pageData);
          onNewPage(pageData);
        } catch (e) {
          console.error('Error parsing chunk:', chunk, e);
        }
      }
      boundary = buffer.indexOf('\n');
    }
  }
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