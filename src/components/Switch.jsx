import { useState } from 'react';

const Switch = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div>
            <label className="switch">
                <input type="checkbox" checked={isChecked} onChange={handleToggle} />
                <span className="slider round"></span>
            </label>
            <span>{isChecked ? 'ON' : 'OFF'}</span>
        </div>
    );
};

export default Switch;
