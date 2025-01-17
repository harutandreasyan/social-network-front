import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { METHODS, useHttpMutation, useHttpQuery } from '../../helpers/useHttp';
import { IResponse } from '../../helpers/types';

export const Layout = () => {

    const links = [
        { name: 'Home', href: '/profile' },
        { name: 'Followers', href: '/profile/followers' },
        { name: 'Followings', href: '/profile/followings' },
        { name: 'Requests', href: '/profile/requests' },
        { name: 'Settings', href: '/profile/settings' },
        { name: 'Messages', href: '/profile/messages' },
    ]
    
    const navigate = useNavigate()
    const { data, loading, refetch } = useHttpQuery<IResponse>("/verify")
    const [logout] = useHttpMutation<IResponse>(() => navigate('/'))

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200">
            <nav className="bg-gradient-to-r from-gray-800 to-gray-700 shadow-lg">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <h1 className="text-3xl font-semibold text-white">Social</h1>
                    <ul className="flex space-x-8 items-center">
                        {links.map((link, index) => (
                            <li key={index}>
                                <NavLink
                                    end
                                    to={link.href}
                                    className="text-gray-300 hover:text-white px-4 py-2 rounded-md text-lg font-medium transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-800"
                                >
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                        <li>
                            <button
                                onClick={() => logout('/logout', METHODS.POST)}
                                className="bg-red-800 hover:bg-red-900 text-white px-6 py-2 rounded-lg text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            <main className="container mx-auto px-6 py-8">
                <Outlet
                    context={{ user: data.user, refetch }}
                />
            </main>
        </div>
    );
};
