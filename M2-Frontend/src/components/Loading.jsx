import React, { memo } from 'react';
import { ThreeCircles } from 'react-loader-spinner';

const Loading = () => {
    return (
        <div>
            <ThreeCircles
                height="100"
                width="100"
                color="white"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
            />
        </div>
    )
}

export default memo(Loading)