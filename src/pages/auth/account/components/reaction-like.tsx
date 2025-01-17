import { useContext } from "react";
import { AccountContext } from "../context";
import { METHODS, useHttpMutation } from "../../../../helpers/useHttp";
import { IPostResponse, IResponse } from "../../../../helpers/types";

interface IReactionLikeProps {
    post: IPostResponse
}

export const ReactionLike: React.FC<IReactionLikeProps> = ({ post }) => {
    const context = useContext(AccountContext);
    if (!context) throw new Error("Out of provider...");

    const { refetch } = context;
    const [makeRequest] = useHttpMutation<IResponse>(refetch);

    const handleLike = (postId: number) => {
        makeRequest(`/posts/react/${postId}`, METHODS.POST);
    }
    
    return (
        <div className="p-2 flex gap-2">
            <img
                onClick={() => handleLike(post.id)}
                src={post.isLiked ? "../../images/liked.png" : "../../images/not-liked.png"}
                className="w-5 h-5 cursor-pointer transition-transform duration-300 hover:scale-110"
                alt="Like button"
            />
            <h2 className="text-sm font-semibold text-gray-800">
                {post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
            </h2>
        </div>
    )
}