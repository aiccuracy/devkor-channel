import { BASE_URL, APP_VERSION } from '../constants/url.js';
import { makeUrl, makeSenderUrl, makeSearchParamsUrl } from './utils.js';
import { send } from './fetch.js';

export const sendMessage = (sender, senderId, additionalPath, searchParams, body, method) => {
  if (additionalPath && additionalPath !== 'messages' && additionalPath !== 'sessions' && additionalPath !== 'announce') return console.log('wrong additional path!');

  const urlWithSender = makeSenderUrl(makeUrl(BASE_URL, APP_VERSION), sender);
  const urlWithSenderId = senderId ? `${urlWithSender}/${String(senderId)}` : urlWithSender;
  const urlWithPath = additionalPath ? `${urlWithSenderId}/${additionalPath}` : urlWithSenderId;
  const url = makeSearchParamsUrl(urlWithPath, searchParams);

  return send(url, body, method);
};
