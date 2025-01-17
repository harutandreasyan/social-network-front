import { useOutletContext } from "react-router-dom";
import { IContext } from "../../../../helpers/types";
import { ProfileCover } from "./profile-cover";
import { BASE_URL } from "../../../../helpers/constants";
import { ImageUpload } from "./image-upload";
import { useRef } from "react";

export const ProfileHeader = () => {
    const { user } = useOutletContext<IContext>()
    const photoInputRef = useRef<null | HTMLInputElement>(null)

    const handleProfileImageClick = () => {
        photoInputRef.current?.click()
    }

    return (
        user && (
            <div className="relative w-full bg-gray-900 text-white">
                <ProfileCover />

                <div className="absolute top-40 left-8 flex items-center">
                    <div className="relative w-32 h-32">
                        <img
                            className="w-full h-full rounded-full object-cover border-4 border-gray-900 shadow-lg cursor-pointer"
                            src={
                                user.picture
                                    ? BASE_URL + user.picture
                                    : "../../images/default-prof-image.png"
                            }
                            alt="Profile"
                            onClick={handleProfileImageClick}
                        />
                    </div>
                    <div className="ml-6 mt-20">
                        <h1 className="text-3xl font-bold">{user.name} {user.surname}</h1>
                    </div>
                </div>

                <ImageUpload photoInputRef={photoInputRef} />

                <div className="mt-20 px-8">
                    <div className="flex gap-8">
                        <div className="flex flex-col items-center">
                            <p className="text-blue-400 text-lg font-bold">{user.followers.length || 0}</p>
                            <p className="text-gray-400">Followers</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-blue-400 text-lg font-bold">{user.following.length || 0}</p>
                            <p className="text-gray-400">Following</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-blue-400 text-lg font-bold">0</p>
                            <p className="text-gray-400">Posts</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}
