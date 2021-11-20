import React from 'react';
import { useParams } from 'react-router';
import MessageArea from '../components/MessageArea';
import {
  setMessageReplies,
  setMessages,
  setNewMessageInput,
} from '../state/reducer';
import { useStateValue } from '../state/state';
import { Message, MessageReply } from '../types';
import axiosHelper from '../utils/axiosHelper';

const Messages = () => {
  const [{ messages, messageReplies, newMessageInput, houseToEdit }, dispatch] =
    useStateValue();
  const { id } = useParams();
  const [messageInputOpen, setMessageInputOpen] =
    React.useState<boolean>(false);
  const [replyInputOpen, setReplyInputOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    axiosHelper
      .get<Message[]>(`api/messages/${id}`)
      .then((res) => {
        dispatch(setMessages(res));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleMessageInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch(setNewMessageInput(event.target.value));
  };

  const addNewMessage = () => {
    const messageObj = {
      content: newMessageInput,
      houseId: id,
    };
    axiosHelper
      .post(`api/messages`, messageObj)
      .then((result) => {
        const addedMessage = result.data as Message;
        dispatch(setMessages(messages.concat(addedMessage)));
        dispatch(setNewMessageInput(''));
        setMessageInputOpen(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div style={{ padding: '20px' }}>Viestit</div>
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => setMessageInputOpen(true)}>
        Lisää uusi viesti
      </div>
      <div>
        {!messageInputOpen ? (
          <div></div>
        ) : (
          <div>
            <input
              onChange={handleMessageInputChange}
              type='text'
              name='message'
              placeholder='Uusi viesti...'
            />
            <button onClick={addNewMessage}>Lisää!</button>
          </div>
        )}
      </div>
      <div className='MessageArea'>
        <MessageArea messages={messages} houseToEdit={houseToEdit} />
      </div>
    </div>
  );
};

export default Messages;
