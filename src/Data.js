// src/data.js
import { useState, useCallback } from 'react';
import { logFile } from './API';

const useParsedData = () => {
  const [parsedData, setParsedData] = useState(null);

  const fetchParsedData = useCallback(async (filePath) => {
    try {
      const data = await logFile(filePath);
      console.log('--Data.js-- Parsed Data:', data.parsed_data);
      setParsedData(data.parsed_data);
    } catch (error) {
      console.error('--Data.js-- Error fetching parsed data:', error);
    }
  }, []);

  return [parsedData, fetchParsedData];
};

export default useParsedData;
