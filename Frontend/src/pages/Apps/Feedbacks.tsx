import { useState, useEffect } from 'react';
import axios from 'axios';
import StarIcon from './StarIcon'; // Adjust the path if necessary
import Swal from 'sweetalert2';

const AITools = () => {
    const [cardsData, setCardsData] = useState<Array<{ id: string; name: string; role: string; profilePic: string; rating: number; description: string }>>([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                // Make the GET request to fetch all todos
                const response = await axios.get('http://localhost:8070/feedback/getAllFeedbacks', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setCardsData(response.data);
            } catch (error) {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: error.response?.data?.error || 'Error creating task ',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            }
        };

        fetchTodos();
    }, []);

    return (
        <div className="container mx-auto px-4">
            {/* Grid layout for the cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cardsData.map((card) => (
                    <div key={card.id} className="mb-5 flex items-center justify-center">
                        <div
                            className="max-w-[18rem] w-full bg-[#3b3f5c] shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none p-5"
                            style={{ minHeight: '300px' }}
                        >
                            <div className="text-center text-black-light">
                                <div className="mb-5 w-20 h-20 rounded-full overflow-hidden mx-auto">
                                    <img src={card.expertId.profilePicture} alt="profile" className="w-full h-full object-cover" />
                                </div>
                                <h5 className="text-white text-[15px] font-semibold mb-2">
                                    {card.expertId.firstName} {card.expertId.lastName}
                                </h5>
                                <p> {card.expertId.field}</p>
                                <div className="flex items-center my-4 justify-center">
                                    {[...Array(5)].map((_, index) => (
                                        <StarIcon key={index} filled={card.rating > index} />
                                    ))}
                                </div>
                                <p className="font-semibold italic">{card.review}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AITools;
