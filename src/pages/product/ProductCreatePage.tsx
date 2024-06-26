import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddCircle } from '@mui/icons-material';
import { useCreateProduct } from '../../hooks/product/useCreateProduct';
import { Product } from '../../types/Product';
import { useSnackbar } from '../../context/SnackbarContext';
import { useAuthContext } from '../../context/AuthContext';
import ProductForm from '../../components/ProductForm';
import { useAuthenticatedGuard } from '../../hooks/guard/useAuthenticatedGuard';

function ProductCreatePage() {
  useAuthenticatedGuard();
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
  const { authState } = useAuthContext();

  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const createPartMutation = useCreateProduct();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    partData.userId = authState.id;
    createPartMutation.mutate(partData, {
      onSuccess: (data: Product) => {
        navigate(`/detail/${data.id}`);
        if (snackbar) {
          snackbar.openSnackbar('product part created successfully!', 'success');
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
      <ProductForm
        partData={partData}
        setPartData={setPartData}
        handleSubmit={handleSubmit}
        formTitle="Add Hardware Part"
        submitButtonText="Add Part"
        icon={<AddCircle color="primary" sx={{ fontSize: 40 }} />}
      />
    </>
  );
}

export default ProductCreatePage;
