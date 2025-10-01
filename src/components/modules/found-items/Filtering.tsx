"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { RotateCw } from "lucide-react";
import { ICategory } from "@/src/types";
import { useGetCategories } from "@/src/hooks/categories.hook";
import { Button } from "@heroui/button";

const Filtering = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data } = useGetCategories();
  const { data: categories } = data || [];

  const handleCategoryChange = (categoryName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Set the category parameter
    params.set('category', categoryName);

    router.push(`/found-items?${params.toString()}`);
  };

  const handleReset = () => {
    router.push("/found-items");
  };

  return (
    <div className="my-5 flex items-center justify-end">
      <div className="flex justify-center gap-1">
        {categories?.map(({ _id, name }: ICategory) => (
          <Button
            key={_id}
            size="sm"
            variant="ghost"
            onClick={() => handleCategoryChange(name)}
          >
            {name}
          </Button>
        ))}
        <Button 
          className="rounded-lg" 
          size="sm" 
          variant="ghost"
          onClick={handleReset}
        >
          <RotateCw />
        </Button>
      </div>
    </div>
  );
};

export default Filtering;