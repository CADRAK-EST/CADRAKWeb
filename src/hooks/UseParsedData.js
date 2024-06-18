import { useCallback } from 'react';
import { parseData } from '../api/APICalls';

const useParsedData = () => {
  const fetchParsedData = useCallback(async (filePath, onNewPage) => {
    try {
      await parseData(filePath, onNewPage);
    } catch (error) {
      console.error('Error fetching parsed data:', error);
    }
  }, []);

  return fetchParsedData;
};

export default useParsedData;
