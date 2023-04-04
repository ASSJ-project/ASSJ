import JobFilter from '@/components/domain/Map/DataFilter/JobFilter';
import RegionFilter from '@/components/domain/Map/DataFilter/RegionFilter';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const SearchModal = () => {
  const setFilterRegion = useSelector((state) => state.setFilterRegion);
  const setFilterJob = useSelector((state) => state.setFilterJob);

  useEffect(() => {
    console.log('setFilterJob updated:', setFilterJob);
  }, [setFilterJob]);

  return (
    <>
      <div>
        <h2>Selected Subcategory: {setFilterRegion}</h2>
        <h2>Selected Job: {setFilterJob}</h2>
      </div>
      <JobFilter />
      <RegionFilter />
    </>
  );
};

export default SearchModal;
