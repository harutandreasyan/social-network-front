import { useState } from "react";
import { METHODS, useHttpMutation } from "../../../../helpers/useHttp";
import { IContext, IResponse } from "../../../../helpers/types";
import { useOutletContext } from "react-router-dom";

export const UpdatePrivacy = () => {
    const { user, refetch } = useOutletContext<IContext>();
    const [privacy, setPrivacy] = useState(user?.isPrivate);
    const [makeRequest] = useHttpMutation<IResponse>(refetch);

    const handlePrivacyToggle = () => {
        const updatedPrivacy = privacy === 0 ? 1 : 0;
        setPrivacy(updatedPrivacy);
        makeRequest("/account/set", METHODS.PATCH);
    };

    return (
        <div className="p-4 bg-gray-800 rounded-lg shadow-md max-w-sm mx-auto my-20">
            <h1 className="text-lg font-semibold text-gray-200 mb-3">Change Account Privacy</h1>
            <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-400">
                    {privacy === 0 ? "Public" : "Private"}
                </span>
                <div
                    onClick={handlePrivacyToggle}
                    className={`relative w-20 h-10 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${
                        privacy === 0 ? "bg-green-600" : "bg-red-600"
                    }`}
                >
                    <span
                        className={`absolute left-1 top-1 w-8 h-8 bg-white rounded-full flex items-center justify-center transition-transform duration-300 ${
                            privacy === 1 ? "translate-x-10" : "translate-x-0"
                        }`}
                    >
                        <img
                            src={
                                privacy === 0
                                    ? "../../../images/public-acc.png"
                                    : "../../../images/private-acc.png"
                            }
                            className="w-6 h-6"
                        />
                    </span>
                </div>
            </div>
        </div>
    );
};
