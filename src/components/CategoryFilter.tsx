import { Filter } from 'lucide-react';

const categories = [
  { id: 'all', name: 'All Props' },
  { id: 'furniture', name: 'Furniture' },
  { id: 'lighting', name: 'Lighting' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'plants', name: 'Plants' },
];

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <Filter className="w-5 h-5" />
      <div className="flex gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === category.id
                ? 'bg-black text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}