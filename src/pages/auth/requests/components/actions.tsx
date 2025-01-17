import { useOutletContext } from "react-router-dom";
import { IContext, IRequest, IResponse } from "../../../../helpers/types";
import { METHODS, useHttpMutation } from "../../../../helpers/useHttp";
import { BASE_URL } from "../../../../helpers/constants";

interface IActionProps {
    request: IRequest
}

export const Actions: React.FC<IActionProps> = ({ request }) => {

    const { refetch } = useOutletContext<IContext>()
    const [makeRequest, error] = useHttpMutation<IResponse>(refetch)

    const handleAction = (type: "accept" | "decline") => {
        makeRequest(`/requests/${type}/${request.id}`, METHODS.PATCH)
    }

    return (
        <div className="bg-gray-800 text-gray-100 p-4 rounded-lg shadow-md flex items-center gap-4">
            <img
                src={BASE_URL + request.user.picture || "../../images/default-prof-image.png"}
                className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
                <h2 className="text-lg font-semibold text-white-500">
                    {request.user.name} {request.user.surname}
                </h2>
                {error && (
                    <p className="text-red-500 text-sm mt-1">
                        Something went wrong. Please try again.
                    </p>
                )}
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => handleAction("accept")}
                    className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-md shadow transition"
                >
                    Accept
                </button>
                <button
                    onClick={() => handleAction("decline")}
                    className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-md shadow transition"
                >
                    Decline
                </button>
            </div>
        </div>
    )
}
