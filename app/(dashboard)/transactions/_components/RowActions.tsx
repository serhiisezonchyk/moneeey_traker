import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Trash } from 'lucide-react';
import React from 'react';
import { TransactionHistoryRow } from './TransactionTable';
import DeleteTransactionDialog from '../../_components/_dialogs/DeleteTransactionDialog';

const RowActions = ({ transaction }: { transaction: TransactionHistoryRow }) => {
  const [showDeleteDialog, setShowDeletedialog] = React.useState(false);
  return (
    <>
    <DeleteTransactionDialog open={showDeleteDialog} setOpen={setShowDeletedialog} transactionId={transaction.id}></DeleteTransactionDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} className="size-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center gap-2"
            onSelect={() => {
              setShowDeletedialog((prev) => !prev);
            }}
          >
            <Trash className="size-4 text-muted-foreground" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default RowActions;
