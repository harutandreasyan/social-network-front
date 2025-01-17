import { useState } from "react";
import { IResponse, IPostResponse } from "../../../../helpers/types";
import { METHODS, useHttpMutation, useHttpQuery } from "../../../../helpers/useHttp";
import { BASE_URL } from "../../../../helpers/constants";
import { RemovePost } from "./remove-post";

export const Gallery = () => {
    const { data, error, refetch } = useHttpQuery<IResponse>("/posts", true);
    const [deleteRequest] = useHttpMutation<IResponse>(refetch);
    const [activePostId, setActivePostId] = useState<number | null>(null);
    const posts = (data?.payload as IPostResponse[]) || [];

    if (error) return <p className="text-red-500">Error: {error}</p>

    const handleRemove = (postId: number) => {
        deleteRequest("/posts/" + postId, METHODS.DELETE)
        setActivePostId(null)
    };

    return (
        <div className="grid grid-cols-3 gap-1 sm:gap-2 p-2">
            {posts.map((post) => (
                <div key={post.id} className="text-center relative">
                    <div className="relative group aspect-square bg-gray-100 overflow-hidden">
                        <img
                            src={BASE_URL + post.picture}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <RemovePost
                            onRemove={handleRemove}
                            post={post}
                            isOpen={activePostId === post.id}
                            setOpen={(isOpen) => setActivePostId(isOpen ? post.id : null)}
                            activePostId={activePostId}
                        />
                    </div>
                    <p
                        className="text-sm text-white-800 font-small mt-1 description"
                        style={{
                            backgroundColor: "rgba(0, 0, 0, 0.5)", 
                            padding: "5px 10px",
                            borderRadius: "5px", 
                            textAlign: "left",
                        }}
                    >
                        {post.title}
                    </p>

                </div>
            ))}
        </div>
    );
};
