
export const INLINE_MESSAGES_ACTIONS = {
	DISPLAY_INLINE_MESSAGE : 'DISPLAY_INLINE_MESSAGE',
	RESET_INLINE_MESSAGES: 'RESET_INLINE_MESSAGES',
};



const doResetInlineMessages = async () => {
	return await {
		status:true,
		response:{display_message:'',display_message_type:''}};
};

const doDisplayInlineMessage = async ({display_message,display_message_type}) => {
	return await {status:true,response:{
		display_message:display_message,
		display_message_type:display_message_type
	}};
};

export const doDispatchResetInlineMessages = () => {
	return(dispatch,getState) => {
		doResetInlineMessages().then(result => {
			dispatch({
				type:INLINE_MESSAGES_ACTIONS.RESET_INLINE_MESSAGES,
				payload:{
					response:{...result.response},
				}
			});
		});
	};
};

export const doDispatchDisplayInlineMessage = (display_message,display_message_type) => {
	return(dispatch,getState) => {
		doDisplayInlineMessage(display_message,display_message_type).then(result => {
			dispatch({
				type:INLINE_MESSAGES_ACTIONS.DISPLAY_INLINE_MESSAGE,
				payload:{
					response:{...result.response},
				}
			});
		});
	};
};