"use client";
import { format } from "date-fns";
import { Calendar, Eye, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {  TClaimRequest } from "@/src/types";
import ImageGallery from "./ImageGallery";
import { Avatar } from "@heroui/avatar";

type TProps = {
  post: TClaimRequest;
};

export default function ClaimPostCard({ post }: TProps) {
  const {
    answers,
    item,
    _id,
    claimant,
    description,
    feedback,

  } = post || {};
  console.log("Post in ClaimPostCard:", post);

  const { images, dateFound, location, city } = item || {};
  const { profilePhoto, name } = claimant || {};

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleAnswers = (data: Record<string, any>) => {
    setSelectedAnswers(data);
    setIsModalOpen(true);
  };

  return (
    <div className="mb-2 rounded-md bg-default-100 p-4">
      <div className="border-b border-default-200 pb-2">
        <div className="border-b border-default-200 py-4">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <Link href={`/found-items/${_id}`}>
                <h1 className="cursor-pointer text-2xl">{item?.title}</h1>
              </Link>
              <p className="flex items-center gap-1 text-xs">
                Found on: <Calendar width={14} />
                {dateFound && !isNaN(Date.parse(dateFound))
                  ? format(new Date(dateFound), "dd MMM, yyyy")
                  : "Unknown"}
              </p>
            </div>
            <div>
              <p className="flex items-center gap-1">
                <MapPin width={18} />
                {location}, {city}
              </p>
            </div>
          </div>
          <p>{item?.description}</p>
        </div>

       {
        images && images.length > 0 && (
          <ImageGallery images={images} />
        )
       }
      </div>

      <div>
        <div className="mx-auto my-3 flex w-full items-center gap-2">
          <Avatar isBordered name={name} radius="sm" src={profilePhoto} />
          <div className="flex w-full items-center justify-between rounded-md bg-default-200 px-4 py-2 dark:bg-[#333335]">
            <div>
              <p className="text-xs text-default-600">{name}</p>
              <p>{description}</p>
            </div>
            <Eye
              className="cursor-pointer"
              onClick={() => handleAnswers({ answers, id: _id })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}