'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { DeleteTransaction } from '../../transactions/_actions/deleteTransaction';

interface DeleteTransactionDialogType {
  open: boolean;
  setOpen: (open: boolean) => void;
  transactionId: string;
}
const DeleteTransactionDialog = ({ open, setOpen, transactionId }: DeleteTransactionDialogType) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: DeleteTransaction,
    onSuccess: async () => {
      toast.success('Transaction deleted successfully', {
        id: transactionId,
      });
      await queryClient.invalidateQueries({
        queryKey: ['transactions'],
      });
    },
    onError: () => {
      toast.error('Something went wrong', {
        id: transactionId,
      });
    },
  });
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>This with permanently delete your transaction</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              toast.loading(`Deleting transaction...`, {
                id: transactionId,
              });
              mutation.mutate(transactionId);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTransactionDialog;
