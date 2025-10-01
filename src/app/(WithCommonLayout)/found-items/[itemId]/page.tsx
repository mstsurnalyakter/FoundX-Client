

import { Container } from "@/src/components/UI/Container";
import Post from "@/src/components/UI/Post";
import { getPost } from "@/src/services/Post";






const ItemDetailPage = async ({ params }: { params: Promise<{itemId:string}> }) => {
  const { itemId } = await params;
  const { data: post } = await getPost(itemId);

  return (
    <Container>
      <div className="mx-auto my-3 max-w-[720px]">
        <Post key={post?._id} post={post} />
      </div>
    </Container>
  );
};

export default ItemDetailPage;