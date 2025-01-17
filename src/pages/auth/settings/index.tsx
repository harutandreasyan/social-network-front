import { UpdateLogin } from "./components/update-login";
import { UpdatePrivacy } from "./components/update-privacy";
import { UpdatePassword } from "./components/update-pwd";

export const Settings = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Settings</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <UpdatePassword />
        <UpdateLogin />
        <UpdatePrivacy />
      </div>
    </div>
  )
}
