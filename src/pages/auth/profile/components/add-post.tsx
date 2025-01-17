import { useOutletContext } from "react-router-dom";
import { IContext, IPost } from "../../../../helpers/types";
import { useRef, useState } from "react";
import { Http } from "../../../../helpers/api";

export const AddPost = () => {
    const { user, refetch } = useOutletContext<IContext>();
    const photo = useRef<null | HTMLInputElement>(null);
    const [preview, setPreview] = useState("");
    const [description, setDescription] = useState("");
    const [isAddingPost, setIsAddingPost] = useState(false)

    const handleChange = () => {
        const upload = photo.current?.files?.[0];
        if (!upload) return;

        const reader = new FileReader();
        reader.readAsDataURL(upload);
        reader.onload = () => setPreview(reader.result as string);
    };

    const handleUpload = () => {
        const file = photo.current?.files?.[0];
        if (!file || !description.trim()) return;
        const form = new FormData();
        form.append("photo", file);
        form.append("content", description.trim());

        Http.post<IPost>(`posts`, form)
            .then(() => {
                refetch()
                setPreview("")
                setDescription("")
            })
    }

    const handleAdd = () => {
        photo.current?.click()
        setIsAddingPost(true)
    }

    return (
        user && (
            <div className="bg-gray-900 text-white">
                <div className="flex items-center gap-6 mb-6">
                    {!isAddingPost && (
                        <button
                            onClick={handleAdd}
                            className="px-6 py-2 mb-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-lg transition-all"
                        >
                            Add Post
                        </button>
                    )}

                    <input
                        type="file"
                        ref={photo}
                        style={{ display: "none" }}
                        onChange={handleChange}
                    />

                    {preview && (
                        <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-sm">
                            <p className="text-gray-400 text-sm mb-3">Preview</p>
                            <div className="w-full h-48 bg-gray-700 mb-3 rounded-lg overflow-hidden">
                                <img
                                    src={preview}
                                    alt="Image preview"
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            <textarea
                                placeholder="Add a description"
                                className="w-full bg-gray-700 p-2 rounded mb-3"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <div className="flex gap-3">
                                <button
                                    onClick={handleUpload}
                                    className="bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-md"
                                >
                                    Upload
                                </button>

                                <button
                                    onClick={() => {
                                        setPreview("")
                                        setDescription("")
                                        setIsAddingPost(false)
                                    }}
                                    className="bg-gray-600 hover:bg-gray-500 px-3 py-1.5 rounded-md"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    );
};
