import React from 'react';

const Message = (props) => {
    return (
        <p className='text-danger'>{props.message.name} {props.message.message}</p>
    )
}

export default Message;