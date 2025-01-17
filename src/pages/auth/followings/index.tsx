import { IResponse, IUser } from "../../../helpers/types";
import { useHttpQuery } from "../../../helpers/useHttp";
import { BASE_URL } from "../../../helpers/constants";
import { useNavigate } from "react-router-dom";

export const Followings = () => {
    const { data, error } = useHttpQuery<IResponse>("/following", true);
    const followers = (data?.payload as IUser[]) || [];

    if (error) return <p className="text-red-500 text-center mt-4">Error: {error}</p>;
    const navigate = useNavigate()

    return (
        <div className="p-6 bg-gray-900 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">People you follow</h2>
            {followers.length === 0 ? (
                <p className="text-gray-400 text-center">No followings yet.</p>
            ) : (
                <div className="flex flex-col items-center space-y-4">
                    {followers.map((follower) => (
                        <div
                            onClick={() => navigate(`/profile/${follower.id}`)}
                            key={follower.id}
                            className="flex items-center bg-gray-800 rounded-lg shadow-md p-4 max-w-sm w-full hover:bg-gray-700 transition duration-200"
                        >
                            <img
                                src={follower.picture
                                    ? BASE_URL + follower.picture
                                    : "../../images/default-prof-image.png"
                                }
                                alt={`${follower.name} ${follower.surname}`}
                                className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500"
                            />
                            <div className="ml-4">
                                <p className="text-lg font-medium text-white">
                                    {follower.name} {follower.surname}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
