import React from 'react';

const Message = (props) => {
    return (
        <p className='text-danger'><strong className='text-success'>{props.message.name}</strong> {props.message.message}</p>
    )
}

export default Message;