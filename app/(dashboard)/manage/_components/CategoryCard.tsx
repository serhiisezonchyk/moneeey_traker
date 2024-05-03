import { Button } from '@/components/ui/button';
import { Category } from '@prisma/client';
import { Trash } from 'lucide-react';
import DeleteCategoryDialog from '../../_components/_dialogs/DeleteCategoryDialog';
interface CategoryCardProps {
  category: Category;
}
const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <div className="flex border-separate flex-col justify-between rounded-md border shadow-md shadow-black/[0.1] dark:shadow-white/[0.1]">
      <div className="flex flex-col items-center gap-2 p-4">
        <span className="text-3xl" role="img">
          {category.icon}
        </span>
        <span>{category.name}</span>
      </div>
      <DeleteCategoryDialog
        category={category}
        trigger={
          <Button
            className="flex w-full border-separate items-center gap-2 rounded-t-none text-muted-foreground hover:bg-rose-500/20"
            variant={'secondary'}
          >
            <Trash className="size-4" /> Remove
          </Button>
        }
      />
    </div>
  );
};

export default CategoryCard;
