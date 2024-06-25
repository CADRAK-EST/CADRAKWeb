import { useCallback } from 'react';
import { parseData } from '../api/APICalls';

const useParsedData = () => {
  const fetchParsedData = useCallback(async (filePath, onNewPage) => {
    try {
      if (typeof onNewPage !== 'function') {
        throw new TypeError('onNewPage must be a function');
      }
      await parseData(filePath, onNewPage);
    } catch (error) {
      console.error('Error fetching parsed data:', error);
    }
  }, []);

  return fetchParsedData;
};

export default useParsedData;