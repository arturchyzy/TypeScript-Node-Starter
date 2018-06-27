export class ReceiveResponseService {

    public receiveResponse(data: MoMessageReceived) {
        console.log('received response', data);
        console.log('received message: ', data.event['fld-val-list'].message_body);
    }
}

interface MoMessageReceived {
    topic: string;
    attempt: number;
    event: {
        'fld-val-list': {
            'sender_id_alias': string,
            'mo_price': number,
            'company-id': number,
            'sender_id_id': string,
            'message_body': string,
            'message_id': string,
            'to_address': string,
            'has_attachment': boolean,
            'fragments_count': number,
            'from_address': string,
            'application_id': number
        },
        'evt-tp': string;
        timestamp: string;
    };
    'event-id': string;
}