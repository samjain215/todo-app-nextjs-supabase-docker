import { useEffect, useState } from "react";

export default function Selector({ onCategorySelect }) {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const fetchAllCategories = async () => {
        const response = await fetch("/api/categories/getCategories");
        const json = await response.json();
        if (json['error']) {
            alert(`Error: ${json['message']}`);
        } else {
            console.log(json['data']['categories']);
            setCategories(json['data']['categories']);
        }
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category.name);
        setIsOpen(false); // Close dropdown after selection
        if (onCategorySelect) {
            onCategorySelect(category);
        }
    };

    useEffect(() => {
        fetchAllCategories();
    }, []);

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    data-testid="catSelectorButton"
                    type="button"
                    onClick={toggleDropdown}
                    className="inline-flex justify-center w-full rounded-xl border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                >
                    {selectedCategory === "" ? "All" : selectedCategory} ▾
                </button>
            </div>
            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <button
                                    key={category.category_id}
                                    onClick={handleCategorySelect(category)}
                                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-start justify-start"
                                >
                                    {category.name}
                                </button>
                            ))
                        ) : (
                            <p className="px-4 py-2 text-sm text-gray-700">Loading...</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
