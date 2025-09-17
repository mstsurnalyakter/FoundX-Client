

import { Container } from "@/src/components/UI/Container";
import Post from "@/src/components/UI/Post";
import { getPost } from "@/src/services/Post";





interface ItemDetailPageProps {
  params: {
    itemId: string;
  };
}

const ItemDetailPage = async ({ params }: { params: { itemId: string } }) => {
  const { data: post } = await getPost(params.itemId);

  return (
    <Container>
      <div className="mx-auto my-3 max-w-[720px]">
        <Post key={post?._id} post={post} />
      </div>
    </Container>
  );
};

export default ItemDetailPage;