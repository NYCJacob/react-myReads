import React, { Component } from 'react';

const UserMsg = function(props){
	const msgStyle = {
		textAlign: "center",
		color: "red"
	}
	return <div style={msgStyle}> {props.message}</div>;
};

UserMsg.defaultProps = {message:"Default Message"};


export default UserMsg
