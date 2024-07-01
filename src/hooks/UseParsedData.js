import { useCallback } from 'react';
import { parseData } from '../api/APICalls';

const useParsedData = () => {
  const fetchParsedData = useCallback(async (filePath, onNewPage, onReportCard) => {
    try {
      if (typeof onNewPage !== 'function' || typeof onReportCard !== 'function') {
        throw new TypeError('onNewPage and onReportCard must be functions');
      }
      await parseData(filePath, onNewPage, onReportCard);
    } catch (error) {
      console.error('Error fetching parsed data:', error);
    }
  }, []);

  return fetchParsedData;
};

export default useParsedData;