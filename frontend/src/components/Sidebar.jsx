import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="w-64 h-full bg-gray-100 p-4 border-r">
      <h2 className="text-xl font-bold mb-6">POS System</h2>
      <nav className="space-y-4">
        <NavLink to="/menu-items" className="block text-blue-600 hover:underline">Menu Items</NavLink>
        <NavLink to="/categories" className="block text-blue-600 hover:underline">Categories</NavLink>
        <NavLink to="/orders" className="block text-blue-600 hover:underline">Orders</NavLink>
      </nav>
    </div>
  );
}
