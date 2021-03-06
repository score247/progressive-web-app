import * as signalR from "@microsoft/signalr";

export interface IHandlers {
    [key: string]: (data: any) => void//NOSONAR
}

export class SoccerSignalRClient {
    readonly hubConnection: signalR.HubConnection;

    constructor(private readonly hubUrl: string, private readonly handlers: IHandlers) {
        this.hubConnection = new signalR
            .HubConnectionBuilder()
            .withUrl(`${this.hubUrl}/hubs/soccerhub`)
            .build();

        this.registerEvents();
    }

    registerEvents() {
        for (const key in this.handlers) {
            this.hubConnection.on(key, (data) => {
                const jsonObject = JSON.parse(data);

                this.handlers[key](jsonObject);
            });
        }
    }

    start() {
        if (this.hubConnection !== undefined) {
            this.hubConnection.start()
                .then(() => console.log("Connection started!")) //NOSONAR
                .catch(err => console.log(`Error while establishing connection :(. Error ${err}`)); //NOSONAR
        }
    }
}

