'use client'
import { useUser } from '@/src/context/user.provider';
import { IUser, IPost } from '@/src/types';
import { Avatar } from '@heroui/avatar';
import Link from 'next/link';
import { Calendar, MapPin, Share2, Copy, Check } from "lucide-react";
import { format } from "date-fns";
import { Button } from '@heroui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import ImageGallery from './ImageGallery';
import ClaimRequestModal from '../../modals/ClaimRequestModal';
import AuthenticationModal from '../../modals/AuthenticationModal';

interface IProps {
  post: IPost
}

const Post = ({ post }: IProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const hasNativeShare = typeof navigator !== "undefined" && typeof navigator.share === "function";
  const {
    title,
    dateFound,
    description,
    location,
    city,
    _id,
    images,
    user,
    questions,
  } = post || {};

  const { name, email, profilePhoto } = (user as IUser) || {};
  const { user: loggedInUser } = useUser();

  // Generate the share URL
  const shareUrl = `${window.location.origin}/found-items/${_id}`;
  const shareTitle = `Found Item: ${title}`;
  const shareText = `I found this item: ${title} in ${location}, ${city}. Check it out!`;

  // Handle copying to clipboard
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  // Handle native share (mobile devices)
  const handleNativeShare = async () => {
    if (hasNativeShare) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      handleCopyLink();
    }
  };

  // Handle social media sharing
  const handleSocialShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(shareText);

    let shareLink = '';

    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case 'telegram':
        shareLink = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
        break;
      default:
        return;
    }

    window.open(shareLink, '_blank', 'width=600,height=400');
    setIsShareMenuOpen(false);
  };

  // Prevent Link navigation when clicking share button
  const handleShareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsShareMenuOpen(!isShareMenuOpen);
  };

  // Handle interactive element clicks to prevent navigation
  const handleInteractiveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="mb-2 rounded-md bg-default-100 p-4">
      <div className="border-b border-default-200 pb-2">
        <div className="flex items-center justify-between border-b border-default-200 pb-4">
          <div className="flex items-center gap-3">
            <Avatar isBordered name={name} radius="sm" src={profilePhoto} />
            <div>
              <p>{name}</p>
              <p className="text-xs">{email}</p>
            </div>
          </div>
        </div>
        
        <div className="border-b border-default-200 py-4">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <Link href={`/found-items/${_id}`}>
                <h1 className="cursor-pointer text-2xl hover:text-primary transition-colors">
                  {title}
                </h1>
              </Link>
              <p className="flex items-center gap-1 text-xs">
                Found on: <Calendar width={14} />
                {format(new Date(dateFound), "dd MMM, yyyy")}
              </p>
            </div>
            <div>
              <p className="flex items-center gap-1">
                <MapPin width={18} />
                {location}, {city}
              </p>
            </div>
          </div>
          
          <Link href={`/found-items/${_id}`}>
            <p className="cursor-pointer hover:text-primary transition-colors">
              {description}
            </p>
          </Link>
        </div>

        <Link href={`/found-items/${_id}`}>
          <ImageGallery images={images} />
        </Link>

        {/* Action buttons section - prevent navigation */}
        <div 
          className="mt-4 flex gap-5 relative"
          onClick={handleInteractiveClick} // Prevent parent link navigation
        >
          {email !== loggedInUser?.email && (
            <>
              {loggedInUser?.email && (
                <div onClick={handleInteractiveClick}>
                  <ClaimRequestModal id={_id} questions={questions} />
                </div>
              )}
              {!loggedInUser?.email && (
                <div onClick={handleInteractiveClick}>
                  <AuthenticationModal id={_id} />
                </div>
              )}
            </>
          )}
          
          {email !== loggedInUser?.email && (
            <div className="w-[1px] bg-default-200" />
          )}
          
          {/* Share Button with Dropdown */}
          <div className="relative flex-1" onClick={handleInteractiveClick}>
            <Button 
              variant="light" 
              className="flex-1 flex items-center gap-2"
              onClick={handleShareClick}
            >
              <Share2 width={16} />
              Share
            </Button>

            {/* Share Dropdown Menu */}
            {isShareMenuOpen && (
              <div className="absolute bottom-full mb-2 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 min-w-48">
                <div className="p-2">
                  {/* Copy Link Option */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleCopyLink();
                      setIsShareMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                  >
                    {isCopied ? <Check width={16} className="text-green-500" /> : <Copy width={16} />}
                    {isCopied ? 'Copied!' : 'Copy Link'}
                  </button>

                  {/* Native Share (if supported) */}
                  {hasNativeShare && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleNativeShare();
                        setIsShareMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                    >
                      <Share2 width={16} />
                      Share via...
                    </button>
                  )}

                  <hr className="my-2 border-gray-200 dark:border-gray-600" />

                  {/* Social Media Options */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleSocialShare('whatsapp');
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                  >
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">W</span>
                    </div>
                    WhatsApp
                  </button>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleSocialShare('facebook');
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                  >
                    <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">f</span>
                    </div>
                    Facebook
                  </button>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleSocialShare('twitter');
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                  >
                    <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">𝕏</span>
                    </div>
                    Twitter
                  </button>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleSocialShare('telegram');
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                  >
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">T</span>
                    </div>
                    Telegram
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isShareMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsShareMenuOpen(false)}
        />
      )}
    </div>
  );
}

export default Post;