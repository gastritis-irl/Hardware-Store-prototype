import React from 'react';
import { useHardwareParts } from '../hooks/useHardwareParts';
import HardwarePartsGrid from '../util/HardwarePartsGrid';

function HardwareListPage() {
  const { data: hardwareParts, isLoading, isError } = useHardwareParts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>An error occurred while fetching data</div>;
  }

  return <HardwarePartsGrid hardwareParts={hardwareParts || []} />;
}

export default HardwareListPage;
