import React, { Component } from 'react';

const UserMsg = function(props){
	return <div> {props.message}</div>;
};

UserMsg.defaultProps = {message:"Default Message"};


export default UserMsg
