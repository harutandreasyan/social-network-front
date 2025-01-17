import { useOutletContext } from "react-router-dom";
import { IContext, IResponse } from "../../../../helpers/types";
import { useRef, useState } from "react";
import { Http } from "../../../../helpers/api";
import { BASE_URL } from "../../../../helpers/constants";

export const ProfileCover = () => {
    const { user, refetch } = useOutletContext<IContext>()
    const photo = useRef<null | HTMLInputElement>(null)
    const [preview, setPreview] = useState("")

    const handleChange = () => {
        const upload = photo.current?.files?.[0]
        if (!upload) return

        const reader = new FileReader()
        reader.readAsDataURL(upload)
        reader.onload = () => {
            setPreview(reader.result as string)
        }
    }

    const handleUpload = () => {
        const file = photo.current?.files?.[0]
        if (!file) return

        const form = new FormData()
        form.append("cover", file)

        Http.patch<IResponse>("/cover/upload", form).then(() => {
            refetch()
            setPreview("")
        })
    }

    return (
        user && (
            <div className="relative w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
                <div className="relative w-full h-60 bg-gray-300 dark:bg-gray-700 overflow-hidden">
                    <img
                        src={user.cover ? BASE_URL + user.cover : "../../images/default-cover-image.jpg"}
                        alt="Cover"
                        className="w-full h-full object-cover"
                    />
                    <button
                        onClick={() => photo.current?.click()}
                        className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded-md text-sm shadow transition"
                    >
                        Change Cover
                    </button>
                    <input
                        type="file"
                        ref={photo}
                        style={{ display: "none" }}
                        onChange={handleChange}
                    />
                </div>
                {preview && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
                        <div className="flex flex-col items-center bg-gray-800 text-white p-4 rounded-lg shadow-lg w-full max-w-sm">
                            <p className="text-gray-400 text-sm mb-3">Preview...</p>
                            <img
                                className="object-cover w-full h-24 rounded-lg"
                                src={preview}
                                alt="Preview"
                            />
                            <div className="flex justify-end gap-3 w-full mt-3">
                                <button
                                    onClick={handleUpload}
                                    className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-md shadow transition text-sm"
                                >
                                    Upload
                                </button>
                                <button
                                    onClick={() => setPreview("")}
                                    className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1.5 rounded-md shadow transition text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    )
}
