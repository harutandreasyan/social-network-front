import { useContext } from "react"
import { AccountContext } from "../context"
import { BASE_URL } from "../../../../helpers/constants"
import { ActionButton } from "./action-button"

export const AccountHeader = () => {
    const context = useContext(AccountContext)
    if (!context) throw new Error("Out of provider...")

    const { account } = context
    return <>
        {account.picture && <img
            className="w-44 h-44 rounded-full object-cover border-indigo-500 border-solid border-4"
            src={BASE_URL + account.picture}
        />
        }
        <h1 className="text-2xl">{account.name} {account.surname}</h1>

        <ActionButton
           
        />
    </>
}