import Axios from "axios";
import app_name from '../constants';


export let sendMessageToSlack = async (channel, hook, messageBody) => {

    let result = {
        status: false,
        error: {
            code: '',
            message: ''
        }
    };
    try {
        let slackBody = {
            mkdwn: true,
            text: 'Status Message from : ' + app_name,
            attachments: message.map(data => ({
                color: 'good',
                text: `{...data}`
            }))
        }
        if (messageBody === '') {
            messageBody = slackBody
        }

        await Axios.post(channel + hook, messageBody).then(result => {
            if (result.status === 200) {
                return result.data;
            }
        }).then(slack_message => {
            result.status = true;
            result.error.code = 200;
            result.error.message = slack_message;
        })
    } catch (e) {
        console.log('Could not send message with error', e);
    }

    return result;
}