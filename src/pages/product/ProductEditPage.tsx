import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Transform } from '@mui/icons-material';
import { useProduct } from '../../hooks/product/useProduct';
import { useUpdateProduct } from '../../hooks/product/useUpdateProduct';
import { Product } from '../../types/Product';
import ProductForm from '../../components/ProductForm';
import { useSnackbar } from '../../context/SnackbarContext';
import { useAdminOrOwnerGuard } from '../../hooks/guard/useAdminOrOwnerGuard';

function ProductEditPage() {
  const { id } = useParams();
  const snackbar = useSnackbar();
  const idNumber = Number(id) || 0;
  const [partData, setPartData] = useState<Product>({
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
  const { data: fetchedPartData } = useProduct(idNumber);
  const updatePartMutation = useUpdateProduct();

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
            snackbar.openSnackbar('product part updated successfully!', 'success');
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
      <ProductForm
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

export default ProductEditPage;
