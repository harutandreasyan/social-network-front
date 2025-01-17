import { useContext } from "react";
import { AccountContext } from "../context";
import { BASE_URL } from "../../../../helpers/constants";
import { ReactionLike } from "./reaction-like";

export const OtherPosts = () => {
    const context = useContext(AccountContext);
    if (!context) throw new Error("Out of provider...")

    const { account } = context
    const { posts } = account

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {posts.map((post) => (
                <div
                    key={post.id}
                    className="relative w-full bg-white rounded-lg shadow-md overflow-hidden"
                >
                    <img
                        src={BASE_URL + post.picture}
                        alt={post.title}
                        className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
                    />

                    <ReactionLike post={post} />
                </div>
            ))}
        </div>
    )
}
