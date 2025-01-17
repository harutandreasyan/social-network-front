import { IRequest, IResponse } from "../../../helpers/types";
import { useHttpQuery } from "../../../helpers/useHttp";
import { Actions } from "./components/actions";

export const Requests = () => {
    const { data, error } = useHttpQuery<IResponse>("/requests");

    if (error) {
        return <p className="text-red-500 text-center mt-2 text-sm">Error: {error}</p>;
    }

    const requests = (data?.payload as IRequest[]) || [];

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 py-6 px-2">
            <h1 className="text-2xl font-bold mb-6 text-center">Friend Requests</h1>
            <div className="grid gap-3 max-w-xl mx-auto">
                {requests.length > 0 ? (
                    requests.map((request) => (
                        <Actions key={request.id} request={request} />
                    ))
                ) : (
                    <p className="text-center text-gray-400 text-sm">
                        No friend requests at the moment.
                    </p>
                )}
            </div>
        </div>
    );
};
