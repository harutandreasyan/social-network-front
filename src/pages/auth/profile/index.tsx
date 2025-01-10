import { useOutletContext } from "react-router-dom"
import { IContext } from "../../../helpers/types"

export const Profile = () => {
    const { user } = useOutletContext<IContext>()
    return user && <div>
        <h1>{user.name} {user.surname}</h1>
    </div>
}