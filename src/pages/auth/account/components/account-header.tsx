import { useContext } from "react";
import { AccountContext } from "../context";
import { BASE_URL } from "../../../../helpers/constants";
import { ActionButton } from "./action-button";
import { OtherPosts } from "./other-posts";

export const AccountHeader = () => {
    const context = useContext(AccountContext)
    if (!context) throw new Error("Out of provider...")

    const { account } = context

    return (
        <div className="p-4 bg-gray-800 rounded-lg shadow-md flex flex-col items-center space-y-4 w-full max-w-xl mx-auto">
            <div className="relative w-full h-48">
                <img
                    className="w-full h-full object-cover rounded-t-lg shadow-md"
                    src={account.cover
                        ? BASE_URL + account.cover
                        : "../../images/default-cover-image.jpg"
                    }
                    alt="Cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 rounded-t-lg"></div>
            </div>

            <div className="absolute top-52 left-1/2 transform -translate-x-1/2 w-28 h-28">
                <img
                    className="w-full h-full rounded-full object-cover border-4 border-indigo-500 shadow-lg"
                    src={account.picture
                        ? BASE_URL + account.picture
                        : "../../images/default-prof-image.png"
                    }
                />
            </div>

            <h1 className="text-xl font-bold text-white mt-16">
                {account.name} {account.surname}
            </h1>

            <div className="flex gap-3 text-white mt-2">
                <h2 className="bg-blue-600 px-3 py-1 rounded">{`Followers: ${account.followers?.length ?? 0}`}</h2>
                <h2 className="bg-blue-600 px-3 py-1 rounded">{`Followings: ${account.following?.length ?? 0}`}</h2>
                <h2 className="bg-blue-600 px-3 py-1 rounded">{`Posts: ${account.posts?.length ?? 0}`}</h2>
            </div>

            <ActionButton />

            {(!account.isPrivate || account.connection.following) ? (
                <OtherPosts />
            ) : (
                <div className="mt-4 bg-gray-700 p-4 rounded-lg shadow-md text-center">
                    <p className="text-gray-300 text-lg">
                        This account is private. Follow to see their posts.
                    </p>
                </div>
            )}
        </div>
    )
}
