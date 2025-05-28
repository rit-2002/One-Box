import axios from 'axios';

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL || 'https://hooks.slack.com/services/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';
//give url from after create a new webhooks
 const sendSlackNotification = async () => {
    try {
        
        const result = await axios.post(SLACK_WEBHOOK_URL, {
            text: "hii",
        })
        console.log('result', +result)
        ;
    } catch (error) {
        console.error('Failed to send Slack notification:', error);
    }


}
sendSlackNotification();