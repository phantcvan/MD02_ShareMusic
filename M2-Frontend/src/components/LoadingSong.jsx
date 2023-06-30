import React, { memo } from 'react';
import { RotatingLines } from 'react-loader-spinner';

const LoadingSong = () => {
    return (
        <div>
            <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="35"
                visible={true}
            />
        </div>
    )
}

export default memo(LoadingSong)