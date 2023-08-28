import React from 'react';
import { FaCircleNotch } from 'react-icons/fa';

export default function CircleLoading({ ...props }) {
    return <FaCircleNotch className="animate-spin text-purple" size={20} {...props} />;
}
