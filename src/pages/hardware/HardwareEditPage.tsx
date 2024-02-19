import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Transform } from '@mui/icons-material';
import { useHardwarePart } from '../../hooks/hardware/useHardwarePart';
import { useUpdateHardwarePart } from '../../hooks/hardware/useUpdateHardwarePart';
import { HardwarePart } from '../../types/HardwarePart';
import HardwareForm from '../../components/HardwareForm';
import { useSnackbar } from '../../context/SnackbarContext';
import { useAdminOrOwnerGuard } from '../../hooks/guard/useAdminOrOwnerGuard';

function HardwareEditPage() {
  const { id } = useParams();
  const snackbar = useSnackbar();
  const idNumber = Number(id) || 0;
  const [partData, setPartData] = useState<HardwarePart>({
    id: 0,
    createdAt: '',
    updatedAt: '',
    name: '',
    manufacturer: '',
    categoryName: '',
    price: 0,
    description: '',
    userId: 0,
  });

  const navigate = useNavigate();
  const { data: fetchedPartData } = useHardwarePart(idNumber);
  const updatePartMutation = useUpdateHardwarePart();

  useEffect(() => {
    if (fetchedPartData) {
      setPartData(fetchedPartData);
    }
  }, [fetchedPartData]);

  useAdminOrOwnerGuard(partData.userId);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updatePartMutation.mutate(
      { id: idNumber, part: partData },
      {
        onSuccess: (data: {
          id: number;
          name: string;
          manufacturer: string;
          price: number;
          description: string;
          userId: number;
          categoryName: string;
        }) => {
          navigate(`/detail/${data.id}`);
          if (snackbar) {
            snackbar.openSnackbar('hardware part updated successfully!', 'success');
          }
        },
        onError: (error: Error) => {
          if (snackbar) {
            snackbar.openSnackbar(error.message, 'error');
          }
        },
      },
    );
  };

  return (
    <>
      <HardwareForm
        partData={partData}
        setPartData={setPartData}
        handleSubmit={handleSubmit}
        formTitle="Edit Hardware Part"
        submitButtonText="Save"
        icon={<Transform color="primary" />}
      />
    </>
  );
}

export default HardwareEditPage;
