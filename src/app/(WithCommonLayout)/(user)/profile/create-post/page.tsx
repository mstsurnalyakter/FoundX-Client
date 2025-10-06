"use client";

import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { allDistict } from "@bangladeshi/bangladesh-address";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

import FXInput from "@/src/components/form/FXInput";
import dateToISO from "@/src/utils/dateToISO";
import FXSelect from "@/src/components/form/FXSelect";
import { AddIcon, TrashIcon } from "@/src/assets/icons";
import { useUser } from "@/src/context/user.provider";
import { useCreatePost } from "@/src/hooks/post.hook";
import Loading from "@/src/components/UI/Loading";
import generateDescription from "@/src/services/ImageDescription";
import { useGetCategories } from "@/src/hooks/categories.hook";
import { Divider } from "@heroui/divider";
import { FXDatePicker } from "@/src/components/form/FXDatePicker";
import { Button } from "@heroui/button";

const cityOptions = allDistict()
  .sort()
  .map((city: string) => {
    return {
      key: city,
      label: city,
    };
  });

export default function CreatePost() {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const {
    mutate: handleCreatePost,
    isPending: createPostPending,
    isSuccess,
  } = useCreatePost();

  const { user } = useUser();

  const {
    data: categoriesData,
    isLoading: categoryLoading,
    isSuccess: categorySuccess,
  } = useGetCategories();

  let categoryOption: { key: string; label: string }[] = [];

  if (categoriesData?.data && !categoryLoading) {
    categoryOption = categoriesData.data
      .sort()
      .map((category: { _id: string; name: string }) => ({
        key: category._id,
        label: category.name,
      }));
  }

  const methods = useForm({
    defaultValues: {
      description: "",
    }
  });

  const { control, handleSubmit, register, formState: { errors } } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    const postData = {
      ...data,
      questions: data.questions.map((que: { value: string }) => que.value),
      dateFound: dateToISO(data.dateFound),
      user: user!._id,
    };

    formData.append("data", JSON.stringify(postData));

    for (let image of imageFiles) {
      formData.append("itemImages", image);
    }

    handleCreatePost(formData);
  };

  const handleFieldAppend = () => {
    append({ name: "questions" });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setImageFiles((prev) => [...prev, file]);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDescriptionGeneration = async () => {
    if (imagePreviews.length === 0) {
      setError("Please upload an image first");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await generateDescription(
        imagePreviews[0],
        "write a description for social media post describing the given image that starts with 'Found this...'"
      );

      console.log("Generated description:", response);

      // Set the form value and force re-render
      methods.setValue("description", response, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      });

      // Trigger validation and re-render
      await methods.trigger("description");

    } catch (error: any) {
      console.error("Error generating description:", error);
      setError(error.message || "Failed to generate description. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearDescription = () => {
    methods.setValue("description", "");
    setError("");
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));
    setImageFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  if (!createPostPending && isSuccess) {
    router.push("/");
  }

  // Get current description value for reactive updates
  const currentDescription = methods.watch("description");

  return (
    <>
      {createPostPending && <Loading />}
      <div className="h-full rounded-xl bg-gradient-to-b from-default-100 px-[73px] py-12">
        <h1 className="text-2xl font-semibold">Post a found item</h1>
        <Divider className="mb-5 mt-3" />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap gap-2 py-2">
              <div className="min-w-fit flex-1">
                <FXInput label="Title" name="title" />
              </div>
              <div className="min-w-fit flex-1">
                <FXDatePicker label="Found date" name="dateFound" />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 py-2">
              <div className="min-w-fit flex-1">
                <FXInput label="Location" name="location" />
              </div>
              <div className="min-w-fit flex-1">
                <FXSelect label="City" name="city" options={cityOptions} />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 py-2">
              <div className="min-w-fit flex-1">
                <FXSelect
                  disabled={!categorySuccess}
                  label="Category"
                  name="category"
                  options={categoryOption}
                />
              </div>
              <div className="min-w-fit flex-1">
                <label
                  className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                  htmlFor="image"
                >
                  Upload image
                </label>
                <input
                  multiple
                  className="hidden"
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e)}
                />
              </div>
            </div>

            {imagePreviews.length > 0 && (
              <div className="flex gap-5 my-5 flex-wrap">
                {imagePreviews.map((imageDataUrl, index) => (
                  <div
                    key={imageDataUrl}
                    className="relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2"
                  >
                    <img
                      alt="item"
                      className="h-full w-full object-cover object-center rounded-md"
                      src={imageDataUrl}
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                      onClick={() => handleRemoveImage(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap-reverse gap-2 py-2">
              <div className="min-w-fit flex-1">
                {/* Custom Textarea Component */}
                <div className="flex flex-col space-y-2">
                  <label 
                    htmlFor="description" 
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    {...register("description")}
                    value={currentDescription || ""}
                    onChange={(e) => {
                      methods.setValue("description", e.target.value, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true
                      });
                    }}
                    placeholder="Enter description..."
                    rows={6}
                    className={`
                      w-full px-3 py-2 border rounded-xl resize-none
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      transition-colors duration-200
                      ${errors.description 
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600'
                      }
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                      placeholder-gray-500 dark:placeholder-gray-400
                    `}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description.message as string}
                    </p>
                  )}
                </div>
                
                {/* Debug info - remove in production */}
                <div className="text-xs text-gray-500 mt-1">
                  Current value length: {currentDescription?.length || 0}
                </div>
                
                {error && (
                  <p className="text-red-500 text-sm mt-1">{error}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2 mb-4">
              {currentDescription && (
                <Button 
                  type="button"
                  variant="ghost" 
                  onClick={handleClearDescription}
                >
                  Clear Description
                </Button>
              )}
              <Button
                type="button"
                isDisabled={imagePreviews.length === 0}
                isLoading={isLoading}
                onClick={handleDescriptionGeneration}
                color="primary"
              >
                {isLoading ? "Generating..." : "Generate with AI"}
              </Button>
            </div>

            <Divider className="my-5" />

            <div className="flex justify-between items-center mb-5">
              <h1 className="text-xl">Owner verification questions</h1>
              <Button 
                type="button"
                isIconOnly 
                onClick={() => handleFieldAppend()}
              >
                <AddIcon />
              </Button>
            </div>

            <div className="space-y-5">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <FXInput label="Question" name={`questions.${index}.value`} />
                  <Button
                    type="button"
                    isIconOnly
                    className="h-14 w-16"
                    onClick={() => remove(index)}
                  >
                    <TrashIcon />
                  </Button>
                </div>
              ))}
            </div>

            <Divider className="my-5" />
            <div className="flex justify-end">
              <Button size="lg" type="submit">
                Post
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
}