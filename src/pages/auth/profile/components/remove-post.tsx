import { IPostResponse } from "../../../../helpers/types";
import Modal from "react-modal";

interface IRemoveProp {
    onRemove: (id: number) => void
    post: IPostResponse
    isOpen: boolean
    setOpen: (isOpen: boolean) => void
    activePostId: number | null
}

const customStyles = {
    content: {
        width: "300px",
        height: "210px",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#1e293b",
        border: "none",
        borderRadius: "0.5rem",
        padding: "1.5rem",
        color: "#fff",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
    }
}

Modal.setAppElement("#root")

export const RemovePost: React.FC<IRemoveProp> = ({ onRemove, post, isOpen, setOpen, activePostId }) => {
    const isCurrentPostActive = activePostId === post.id

    return (
        <div>
            {!isOpen && (
                <button
                    onClick={() => setOpen(true)}
                    className={`absolute top-2 right-2 bg-gray-800 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 ${
                        !isCurrentPostActive ? "" : "hidden"
                    }`}
                >
                    <img
                        src="../../images/remove-post.png"
                        alt="Remove"
                        className="w-5 h-5"
                    />
                </button>
            )}
            
            <Modal isOpen={isOpen} style={customStyles} onRequestClose={() => setOpen(false)}>
                <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-xl font-semibold mb-6 text-gray-200 text-center">
                        Are you sure you want to remove this post?
                    </p>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => {
                                onRemove(post.id);
                                setOpen(false);
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                        >
                            Yes
                        </button>
                        <button
                            onClick={() => setOpen(false)}
                            className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-6 py-2 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                        >
                            No
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
