import { Prop } from '../types';

interface PropCardProps {
  prop: Prop;
}

export function PropCard({ prop }: PropCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={prop.image_url}
        alt={prop.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{prop.name}</h3>
        <p className="text-gray-600 text-sm mb-4">
          {prop.category} - {prop.subcategory}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">${prop.price}/week</span>
          <button
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
          >
            Rent Now
          </button>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          Available: {prop.quantity} | {prop.dimensions}
        </div>
      </div>
    </div>
  );
}