import React from 'react';

const Message = (props) => {
    return (
        <div>
            <p>{props.message.name}</p>
            <p>{props.message.message}</p>
        </div>
    )
}

export default Message;