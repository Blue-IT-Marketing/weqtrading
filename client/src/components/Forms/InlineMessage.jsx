
import React, {Fragment,useState,useEffect } from 'react';
import {Capitalize} from 'react-lodash';


const InlineMessage = ({message,message_type}) => {
	const [inline,setInline] = useState({message:'',message_type:'info'});
	const [dialogType,setdialogType] = useState({
		main: 'box-info',
		button_type: 'box-title btn-outline-info btn-lg',
		check_mark : 'fa fa-check-circle'
	});

	useEffect(() => {
		setInline({message:message,message_type:message_type});
		if(message_type === 'error'){
			setdialogType({
				main : 'box-danger',
				button_type : 'box-title btn-outline-danger btn-lg',
				check_mark : 'fa fa-close'
			});
		}
		return () => {			
			setInline({message:'',message_type:'info'});
		};
	}, []);

	return (
		<Fragment>
			<div className={dialogType.main}>
				<div className={'box box-header'}>					
					<div className={'box-tools'}>
						<button
							type={'button'}
							className={dialogType.button_type}
						>
								<em>
									<i className={dialogType.check_mark}> </i> <small> 
									{<Capitalize string={inline.message} />}  
								</small></em>
						</button>
					</div>
				</div>
			</div>
		</Fragment>
	)
};


export default InlineMessage;