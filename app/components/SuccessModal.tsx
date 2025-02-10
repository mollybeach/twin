// app/components/SuccessModal.tsx
import React from 'react';

interface SuccessModalProps {
    message: string;
    onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg">
                <h2 className="text-lg font-bold text-green-600">Success!</h2>
                <p className="mt-2 text-gray-800">{message}</p>
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default SuccessModal;