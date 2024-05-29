import {io} from 'socket.io-client';
import {DOMAIN} from './baseApi';
import {store} from 'redux/store';

const jwtToken = store.getState().auth.user?.accessToken;

const socketClient = io(DOMAIN, {
  extraHeaders: {
    Authorization: `Bearer ${jwtToken}`,
  },
});

export default socketClient;
