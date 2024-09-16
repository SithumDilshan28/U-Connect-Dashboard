import React from 'react';

interface StarIconProps {
    filled: boolean;
    onClick: () => void;
}

const StarIcon: React.FC<StarIconProps> = ({ filled, onClick }) => (
    <svg
        onClick={onClick}
        className={`h-6 w-6 cursor-pointer ${filled ? 'text-yellow-400' : 'text-gray-400'}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
    >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.85L18.18 22 12 18.27 5.82 22 7 14.12 2 9.27l6.91-1.01L12 2z" />
    </svg>
);

export default StarIcon;
