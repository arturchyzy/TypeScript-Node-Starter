import { SendTextService } from './send-text.service';
import axios from 'axios';

export class ReceiveResponseService {

    private readonly sendTextService: SendTextService;

    constructor() {
        this.sendTextService = new SendTextService();
    }

    public receiveResponse(data: MoMessageReceived): Promise<void> {
        console.log('received response', data);
        const message = data.event['fld-val-list'].message_body;
        console.log('received message: ', message);
        if (message === 'ping') {
            return this.sendTextService.sendText(data.event['fld-val-list'].from_address, 'pong')
        } else if (message.startsWith('weather for ')) {
            const city = message.substr(12);
            return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${process.env.WEATHER_KEY}`)
                .then(resp => resp.data)
                .catch((err) => {
                    console.log('Error weather: ', err);
                })
                .then((weather: any) => {
                    const weatherMessage = `${weather.weather[0].main}, temperature : ${weather.main.temp}`;
                    return this.sendTextService.sendText(data.event['fld-val-list'].from_address, weatherMessage)
                })
                .catch((err) => {
                    console.log('Error sending weather: ', err);
                });
        }
        return new Promise((() => {}));

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