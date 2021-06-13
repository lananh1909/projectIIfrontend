import React, { Component } from 'react';
import SockJsClient from 'react-stomp';

class SocketClient extends Component {
    render() {
        return (
            <div>
                <SockJsClient url='http://localhost:8081/websocket-chat/'
                    topics={['/topic/user']}
                    onConnect={() => {
                        console.log("connected");
                    }}
                    onDisconnect={() => {
                        console.log("Disconnected");
                    }}
                    onMessage={(msg) => {
                        console.log(msg);
                    }}
                    ref={(client) => {
                        this.clientRef = client
                }}/>
            </div>
        );
    }
}

export default SocketClient;