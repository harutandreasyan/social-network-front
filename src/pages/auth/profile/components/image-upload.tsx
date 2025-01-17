import React, { useState } from "react";
import { Http } from "../../../../helpers/api";
import { IContext, IResponse } from "../../../../helpers/types";
import { useOutletContext } from "react-router-dom";

interface ImageUploadProps {
    photoInputRef: React.RefObject<HTMLInputElement>
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ photoInputRef }) => {
    const [preview, setPreview] = useState("")
    const { refetch } = useOutletContext<IContext>()

    const handleChange = () => {
        const upload = photoInputRef.current?.files?.[0]
        if (!upload) return

        const reader = new FileReader()
        reader.readAsDataURL(upload)
        reader.onload = () => {
            setPreview(reader.result as string)
        }
    }

    const handleUpload = () => {
        const file = photoInputRef.current?.files?.[0]
        if (!file) return

        const form = new FormData()
        form.append("picture", file)

        Http.patch<IResponse>("/profile/upload", form).then(() => {
            refetch()
            setPreview("")
        })
    }

    return (
        <>
            <input
                type="file"
                ref={photoInputRef}
                style={{ display: "none" }}
                onChange={handleChange}
            />
            {preview && (
                <div className="flex flex-col items-center bg-gray-800 text-white p-4 rounded-lg shadow-lg max-w-[250px] mx-auto mt-12">
                    <p className="text-gray-400 text-sm mb-3">Preview...</p>
                    <div className="w-24 h-24 bg-gray-700 flex items-center justify-center rounded-full overflow-hidden mb-3">
                        <img className="object-cover w-full h-full" src={preview} alt="Preview" />
                    </div>
                    <div className="flex justify-center gap-3 w-full">
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
            )}
        </>
    )
}
