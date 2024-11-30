import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Logo } from './components/Logo';
import { PropCard } from './components/PropCard';
import { CategoryFilter } from './components/CategoryFilter';
import { AdminPanel } from './components/admin/AdminPanel';
import { initialProps } from './data/props';
import { Prop } from './types';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [props, setProps] = useState<Prop[]>(initialProps);

  const handlePropsUploaded = useCallback((newProps: Partial<Prop>[]) => {
    setProps(prevProps => [
      ...prevProps,
      ...newProps.map((prop, index) => ({
        ...prop,
        id: `${Date.now()}-${index}`,
      })) as Prop[]
    ]);
  }, []);

  const filteredProps = props.filter((prop) => {
    const matchesCategory = selectedCategory === 'all' || prop.category === selectedCategory;
    const matchesSearch = prop.name?.toLowerCase().includes(searchQuery?.toLowerCase() ?? '') ?? false;
    return matchesCategory && matchesSearch;
  });

  const toggleAdmin = useCallback(() => {
    setIsAdmin(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Logo />
              <button
                onClick={toggleAdmin}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                {isAdmin ? 'View Props' : 'Admin'}
              </button>
            </div>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search props..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {isAdmin ? (
          <AdminPanel onPropsUploaded={handlePropsUploaded} />
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-8">Professional Props for Rent</h1>
            
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProps.map((prop) => (
                <PropCard key={prop.id} prop={prop} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );

}
export default App;
