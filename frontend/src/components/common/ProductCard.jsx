import React from 'react';

const ProductCard = ({ product }) => {
  const imageUrl = product.image 
    ? `http://localhost:5000${product.image}` 
    : 'https://via.placeholder.com/300x200?text=No+Image';

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
        <div className="absolute top-2 right-2">
          <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-gray-800">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">
            ${product.price}
          </span>
          <button className="btn-primary text-sm">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;