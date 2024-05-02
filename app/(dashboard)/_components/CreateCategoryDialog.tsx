'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TransactionType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { CreateCategorySchema, CreateCategorySchemaType } from '@/schema/categories';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CircleOff, Loader2, PlusSquare } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { CreateCategory } from '../_actions/categories';
interface CreateCategoryDialogProps {
  type: TransactionType;
  onSuccessCallback: (category: Category) => void;
}
const CreateCategoryDialog = ({ type, onSuccessCallback }: CreateCategoryDialogProps) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const form = useForm<CreateCategorySchemaType>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      type,
    },
  });
  const queryClient = useQueryClient();
  const theme = useTheme();
  const { mutate, isPending } = useMutation({
    mutationFn: CreateCategory,
    onSuccess: async (data: Category) => {
      form.reset({
        name: '',
        icon: '',
        type,
      });

      toast.success(`Category ${data.name} created successfully 🎉`, {
        id: 'create-category',
      });
      onSuccessCallback(data);
      await queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
      setOpen((prev) => !prev);
    },
    onError: () => {
      toast.error('Something went wrong', {
        id: 'create-category',
      });
    },
  });

  const onSubmit = useCallback(
    (values: CreateCategorySchemaType) => {
      toast.loading('Creating category', {
        id: 'create-category',
      });
      mutate(values);
    },
    [mutate],
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={'ghost'}
          className="flex border-separate items-center justify-start rounded-none border-b px-3 py-3 text-muted-foreground"
        >
          <PlusSquare className="mr-2 size-4" /> Create new
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create
            <span
              className={cn(
                'm-1',
                type === 'income' ? 'text-emerald-700 dark:text-emerald-950' : 'text-rose-700 dark:text-rose-950',
              )}
            >
              {type}
            </span>
            category
          </DialogTitle>
          <DialogDescription>Categories are used to group your transactions</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Category" {...field} />
                  </FormControl>
                  <FormDescription>Type the name of your category</FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={'outline'} className="h-[100px] w-full">
                          {form.watch('icon') ? (
                            <div className="flex flex-col items-center gap-2">
                              <span className="text-5xl" role="img">
                                {field.value}
                              </span>
                              <p className="text-xs text-muted-foreground">Click to change</p>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-2">
                              <CircleOff className="size-12" />
                              <p className="text-xs text-muted-foreground">Click to select</p>
                            </div>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full" align="center">
                        <Picker
                          theme={theme.resolvedTheme}
                          data={data}
                          onEmojiSelect={(emoji: { native: string }) => {
                            field.onChange(emoji.native);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormDescription>Category appearence in the app</FormDescription>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className="">
          <DialogClose asChild>
            <Button
              type="button"
              variant={'secondary'}
              onClick={() => {
                form.reset();
              }}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
            {!isPending ? 'Save' : <Loader2 className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryDialog;
