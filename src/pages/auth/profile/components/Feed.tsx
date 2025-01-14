import { AddPost } from "./AddPost";
import { Gallery } from "./Gallery";

export const Feed = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col p-4">
            <div className="w-full max-w-2xl mb-4">
                <AddPost />
            </div>
            
            <div className="w-full max-w-2xl">
                <Gallery />
            </div>
        </div>
    );
};
