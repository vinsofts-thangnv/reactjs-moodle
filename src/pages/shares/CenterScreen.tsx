import React from "react";

export default (props: any) => {

    return (
        <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
        }}>
            {props?.children}
        </div>
    );
}