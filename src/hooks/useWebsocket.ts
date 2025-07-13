import { useCallback, useEffect, useRef } from "react";

type MessageEventHandler<T> = (data : T) => void;

export function useWebSocket<TSend = any, TRecieve = any>(
    url: string,
    onMessage: MessageEventHandler<TRecieve>
) {
    const socketRef = useRef<WebSocket | null>(null);

    const handleMessage = useCallback(
        (event : MessageEvent) => {
            try {
                const data = event.data;
                onMessage(data);
            } catch (e) {
                console.error("Websocket parse error:", e);
            }
        }, 
        [onMessage]
    );

    useEffect(() => {
        const socket = new WebSocket(url);
        socketRef.current = socket;

        socket.onopen = () => {
            console.log("Socket connected");
        };

        socket.onmessage = handleMessage;

        socket.onerror = (error) => {
            console.error("Socket error:", error);
        };

        socket.onclose = (event) => {
            console.log("Socket closed", event.code, event.reason);
        };

        return () => {
            socket.close();
        };
    }, [url, handleMessage]);

    const sendMessage = useCallback((msg: TSend) => {
        if(socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(msg));
        }
    }, []);

    return { sendMessage };
}