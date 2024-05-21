import {io} from 'socket.io-client';
import {DOMAIN} from './baseApi';

const socket = io(DOMAIN, {transports: ['websocket']});

export default socket;
