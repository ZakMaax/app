export default function PropertyTypeButton({ children, onSelect, isSelected }) {
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
