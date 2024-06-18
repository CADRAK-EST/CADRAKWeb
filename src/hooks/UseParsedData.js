import { useCallback } from 'react';
import { parseData } from '../api/APICalls';

const useParsedData = () => {
  const fetchParsedData = useCallback(async (filePath) => {
    try {
      const data = await parseData(filePath);
      return data.parsed_data
    } catch (error) {
      console.error('Error fetching parsed data:', error);
      return null;
    }
  }, []);

  return fetchParsedData;
};

export default useParsedData;
