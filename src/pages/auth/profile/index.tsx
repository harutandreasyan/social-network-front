import { useOutletContext } from "react-router-dom";
import { IContext } from "../../../helpers/types";
import { ProfileHeader } from "./components/profile-header";
import { Search } from "./components/search";
import { Feed } from "./components/feed";

export const Profile = () => {
    const { user } = useOutletContext<IContext>();

    return (
        user && (
            <div className="min-h-screen bg-gray-900 text-white p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8 mb-8">
                    <div className="flex-1">
                        <ProfileHeader />
                    </div>
                    <div className="flex-none w-full lg:w-1/3">
                        <Search />
                    </div>
                </div>
                <div className="mt-8">
                    <Feed />
                </div>
            </div>
        )
    )
}
