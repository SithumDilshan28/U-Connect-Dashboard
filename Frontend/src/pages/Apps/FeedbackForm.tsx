import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import StarIcon from './StarIcon';

interface FeedbackFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (feedback: { expertId: string; rating: number; review: string }) => void;
    expertId: string | null;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ isOpen, onClose, onSubmit, expertId }) => {
    const [rating, setRating] = useState<number>(0);
    const [review, setReview] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    // Reset form fields when dialog is closed
    useEffect(() => {
        if (!isOpen) {
            setRating(0);
            setReview('');
            setError(null);
        }
    }, [isOpen]);

    const handleSubmit = () => {
        if (rating === 0) {
            setError('Please select a rating before submitting.');
            return;
        }

        if (expertId) {
            onSubmit({ expertId, rating, review });
            onClose();
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" open={isOpen} onClose={onClose}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0" />
                </Transition.Child>
                <div id="standard_modal" className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                    <div className="flex items-start justify-center items-center min-h-screen px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-sm w-full">
                                <div className="text-lg font-semibold mb-4 dark:text-white">Feedback</div>
                                <div className="flex items-center mb-4 justify-center">
                                    {[...Array(5)].map((_, index) => (
                                        <StarIcon key={index} filled={rating > index} onClick={() => setRating(index + 1)} />
                                    ))}
                                </div>
                                {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                                <textarea
                                    className="form-input w-full mt-4 p-2 rounded border border-gray-300 dark:border-gray-600 h-40"
                                    placeholder="Write your review here..."
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                />
                                <button type="button" className="btn bg-primary w-full mt-4 text-white" onClick={handleSubmit}>
                                    Submit Feedback
                                </button>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default FeedbackForm;
