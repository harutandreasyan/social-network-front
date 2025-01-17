import { useContext } from "react";
import { AccountContext } from "../context";
import { METHODS, useHttpMutation } from "../../../../helpers/useHttp";
import { IResponse } from "../../../../helpers/types";

export const ActionButton: React.FC = () => {
    const context = useContext(AccountContext);
    if (!context) throw new Error("Out of provider...");

    const { account, refetch } = context;
    const { following, followsMe, requested } = account.connection;

    const [makeRequest] = useHttpMutation<IResponse>(refetch);

    const handleRequest = () => {
        makeRequest("/account/follow/" + account.id, METHODS.POST);
    };

    return (
        <button
            onClick={handleRequest}
            className={`px-4 py-2 rounded-md font-medium shadow transition-all duration-200 ${following
                    ? "bg-gray-600 text-white hover:bg-gray-500"
                    : followsMe && !requested
                        ? "bg-blue-500 text-white hover:bg-blue-400"
                        : requested
                            ? "bg-red-500 text-white hover:bg-red-400"
                            : "bg-pink-500 text-white hover:bg-pink-400"
                }`}
        >
            {following
                ? "Unfollow"
                : followsMe && !requested
                    ? "Follow Back"
                    : requested
                        ? "Cancel"
                        : "Follow"
            }
        </button>
    );
};
