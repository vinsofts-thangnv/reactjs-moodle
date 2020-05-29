import React from 'react';
import LoadingSvg from '../../loading.svg';

export default () => {
    return (
        <img style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000
        }} src={LoadingSvg} alt="Loading..." />
    );
}