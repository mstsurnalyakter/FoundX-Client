import Filtering from '@/src/components/modules/found-items/Filtering';
import { Container } from '@/src/components/UI/Container'
import Post from '@/src/components/UI/Post';
import axiosInstance from '@/src/lib/axiosInstance';
import { IPost } from '@/src/types';
import React from 'react'

const FoundItems = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  // Await searchParams in Next.js 15
  const resolvedSearchParams = await searchParams;
  const query = typeof resolvedSearchParams.query === 'string' ? resolvedSearchParams.query : '';
  const category = typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : '';

  try {
    // Only send params if they have values
    const requestParams: Record<string, string> = {};
    
    if (query) {
      requestParams.searchTerm = query;
    }
    
    if (category) {
      requestParams.category = category;
    }

    const { data } = await axiosInstance.get(`/items`, {
      params: requestParams,
    });

    return (
      <Container>
        <Filtering />
        <div className="mx-auto my-3 max-w-[720px]">
          {data?.data?.length > 0 ? (
            data.data.map((post: IPost) => <Post key={post?._id} post={post} />)
          ) : (
            <div className="text-center py-8">
              <p>No items found.</p>
            </div>
          )}
        </div>
      </Container>
    )
  } catch (error: any) {
    console.error('Error fetching items:', error);
    return (
      <Container>
        <Filtering />
        <div className="mx-auto my-3 max-w-[720px]">
          <div className="text-center py-8">
            <p className="text-red-500">Error loading items: {error?.response?.data?.message || 'Please try again.'}</p>
          </div>
        </div>
      </Container>
    )
  }
}

export default FoundItems