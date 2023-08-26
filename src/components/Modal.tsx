import React from 'react';

interface RocketProps {
    rocket: {
        id: string;
        rocket_name: string;
        first_flight: string;
        description: string;
        country: string;
        cost_per_launch: number;
        active: boolean;
        height: {
          meters: number
          feet: number
        }
        diameter: {
          meters: number
          feet: number
        }
        mass: {
          kg: number
          lb: number
        }
        wikipedia: string
        // Add other properties as needed
    }
    onClose: () => void;
    isOpen: boolean
  }
const Modal: React.FC<RocketProps> = ({ rocket, onClose, isOpen }) => {
  return (
    <div className={`modal-overlay fixed inset-0 flex items-center justify-center ${isOpen ? 'visible' : 'invisible'}`} id="modal">
      <div className="modal-content flex flex-col gap-4 ">
        <h3 className="font-bold text-center">{rocket?.rocket_name}</h3>
        <p className="text-sm">{rocket?.description}</p>
        <a href={rocket?.wikipedia} target="_blank" className="text-sm text-blue-700">Wikipedia: {rocket?.wikipedia}</a>
        <div className="flex flex-col gap-4 items-end ">
        <button onClick={onClose} className="modal-close text-sm">
          Close
        </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
