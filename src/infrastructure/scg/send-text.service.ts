import axios from 'axios';

export class SendTextService {

    public sendText(to: string, text: string) {
        console.log('sending message', to, ' -> ', text);
        return axios.post(
            'https://developer.syniverse.com/scg-external-api/api/v1/messaging/message_requests',
            {
                body: text,
                from: 'sender_id:nX6HiGTf7YEMjorAhwBDH',
                pause_before_transmit: false,
                sender_id_sort_criteria: [],
                to: [to]
            },
            {
                headers: {Authorization: `Bearer ${process.env.BEARER_TOKEN}`}
            })
            .then((resp) => {
                console.log('message send successfully', resp.data);
            })
            .catch((err) => {
                console.log('Error: ', err);
            });
    }
}