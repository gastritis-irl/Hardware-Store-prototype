import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateHardwarePart } from '../hooks/useCreateHardwarePart';
import { HardwarePart } from '../types/HardwarePart';
import { useSnackbar } from '../context/SnackbarContext';
import { useAuthContext } from '../context/AuthContext';
import HardwareForm from '../util/HardwareForm';

function HardwareCreatePage() {
  const [partData, setPartData] = useState<HardwarePart>({
    id: 0,
    name: '',
    manufacturer: '',
    category: '',
    price: 0,
    description: '',
    userId: 0,
  });
  const { authState } = useAuthContext();

  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const createPartMutation = useCreateHardwarePart();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    partData.userId = authState.id;
    createPartMutation.mutate(partData, {
      onSuccess: (data: HardwarePart) => {
        navigate(`/detail/${data.id}`);
        if (snackbar) {
          snackbar.openSnackbar('Hardware part created successfully!', 'success');
        }
      },
      onError: (error: Error) => {
        if (snackbar) {
          snackbar.openSnackbar(error.message, 'error');
        }
      },
    });
  };

  return (
    <>
      <HardwareForm
        partData={partData}
        setPartData={setPartData}
        handleSubmit={handleSubmit}
        formTitle="Create Hardware Part"
        submitButtonText="Create"
      />
    </>
  );
}

export default HardwareCreatePage;
