import axios from "axios";

export class SendTextService {

    public sendText(to: string, text: string) {
        console.log("sending message", to, " -> ", text);
        axios.post(
            "https://developer.syniverse.com/scg-external-api/api/v1/messaging/message_requests",
            {
                body: text,
                from: "sender_id:nX6HiGTf7YEMjorAhwBDH",
                pause_before_transmit: false,
                sender_id_sort_criteria: [],
                to: [to]
            },
            {
                headers: {Authorization: "Bearer 7c382c26-174d-37f4-bc25-4c30d866d758"}
            })
            .then((resp) => {

                console.log("received resp", resp.data);


            })
            .catch((err) => {
                console.log("Error: ", err);
            });
    }
}