import React, { memo } from 'react';
import { Audio } from 'react-loader-spinner';

const AudioLoading = () => {
    return (
        <div>
            <Audio
                height="30"
                width="30"
                color="white"
                ariaLabel="audio-loading"
                wrapperStyle={{}}
                wrapperClass="wrapper-class"
                visible={true}
            />
        </div>
    )
}

export default memo(AudioLoading)