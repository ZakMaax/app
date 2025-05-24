import React from 'react'
type componentProps = {
  children: React.ReactNode,
  onSelect: () => void,
  isSelected: boolean
}
export default function PropertyTypeButton({ children, onSelect, isSelected }: componentProps) {
  return (
    <button
      onClick={onSelect}
      className={`px-3 py-2 text-lg ${
        isSelected ? "bg-white text-primaryColor" : "text-gray-700"
      }`}
    >
      {children}
    </button>
  );
}
