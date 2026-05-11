import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <aside className="w-full space-y-10">
      {/* Browse Section */}
      <div>
        <h3 className="text-[#7A1114] font-optima font-bold text-lg border-b-2 border-gray-100 pb-3 mb-5">
          BROWSE
        </h3>
        <ul className="space-y-3 text-sm text-gray-700">
          <li>
            <Link
              to="/undergraduate"
              className="hover:text-[#7A1114] hover:translate-x-1 transition-all block"
            >
              Undergraduate Theses
            </Link>
          </li>
          <li>
            <Link
              to="/faculty"
              className="hover:text-[#7A1114] hover:translate-x-1 transition-all block"
            >
              Faculty Research
            </Link>
          </li>
          <li>
            <Link
              to="/postgraduate"
              className="hover:text-[#7A1114] hover:translate-x-1 transition-all block"
            >
              Postgraduate Theses
            </Link>
          </li>
        </ul>
      </div>

      {/* Search Section */}
      <div>
        <h3 className="text-[#7A1114] font-optima font-bold text-lg border-b-2 border-gray-100 pb-3 mb-5">
          SEARCH
        </h3>
        <div className="space-y-3">
          <label className="text-sm text-gray-600">Enter search terms:</label>
          <form onSubmit={handleSearch}>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-[#7A1114]/20 focus-within:border-[#7A1114] transition-all bg-white shadow-sm">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search repository..."
                className="w-full px-4 py-2.5 text-sm outline-none bg-transparent"
              />
              <button
                type="submit"
                className="px-4 py-2.5 text-white bg-[#7A1114] hover:bg-[#5A0C0E] transition-colors border-l border-gray-300"
              >
                <Search size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </aside>
  );
}