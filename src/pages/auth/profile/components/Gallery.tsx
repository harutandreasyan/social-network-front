import { IResponse, IPostResponse } from "../../../../helpers/types";
import { useHttpQuery } from "../../../../helpers/useHttp";
import { BASE_URL } from "../../../../helpers/constants";

export const Gallery = () => {
    const { data, error } = useHttpQuery<IResponse>("/posts", true);
    if (error) return <p className="text-red-500">Error: {error}</p>;

    const posts = (data?.payload as IPostResponse[]) || [];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {posts.map((post) => (
                <div key={post.id} className="p-4 bg-gray-800 rounded-md shadow">
                    <img
                        src={BASE_URL + post.picture}
                        className="w-full h-48 object-cover rounded mb-2"
                    />
                    <p className="text-sm text-gray-400">{post.title}</p>
                </div>
            ))}
        </div>
    );
};