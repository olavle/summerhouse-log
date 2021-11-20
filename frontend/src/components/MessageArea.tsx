import React from 'react';
import { House, Message, MessageReply } from '../types';
import '../styles/House.css';
import axiosHelper from '../utils/axiosHelper';
import { setMessageReplies, setMessageReplyInput } from '../state/reducer';
import { useStateValue } from '../state/state';

interface Props {
  messages: Message[];
  houseToEdit: House;
}

const MessageArea = ({ messages, houseToEdit }: Props) => {
  const [{ messageReplies, newMessageReplyInput }, dispatch] = useStateValue();
  const [replies, setReplies] = React.useState<MessageReply[]>([]);

  React.useEffect(() => {
    setReplies([]);
    console.log('Hello from use effect');
    messages.forEach((message) => {
      console.log('The message in question:', message);
      console.log('Replies:', replies);
      axiosHelper
        .get<MessageReply[]>(`api/messages/${message.id}/replies`)
        .then((res) => {
          res.forEach((reply) => {
            setReplies(replies.concat(reply));
          });
        })
        .catch((err) => console.log(err));
    });
    console.log('replies finally:', replies);
  }, []);

  const addNewReply = (messageId: string) => {
    const reply = {
      content: newMessageReplyInput,
    };
    console.log(reply)
    axiosHelper
      .post(`api/messages/${messageId}/replies`, reply)
      .then((res) => {
        setReplies(replies.concat(res.data));
        dispatch(setMessageReplyInput(''));
        // dispatch(setMessageReplies(messageReplies.concat(res.data)));
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleReplyInputChange: React.ChangeEventHandler<HTMLTextAreaElement> =
    (event) => {
      dispatch(setMessageReplyInput(event.target.value));
    };

  return (
    <div className='MessageArea'>
      {messages.map((message) => {
        return (
          <div style={{ padding: '20px' }} key={message.id}>
            <div className='MessageThread'>
              <div>{message.content}</div>

              <div>
                Vastaukset:
                {replies.length === 0 ? (
                  <p>Ei vastauksia</p>
                ) : (
                  messageReplies.map((reply) => {
                    if (reply.originalMessageId === message.id) {
                      return <div key={reply.id}>{reply.content}</div>;
                    }
                  })
                )}
              </div>
              <div>Vastaa viestiin</div>
              <textarea
                name='reply'
                onChange={handleReplyInputChange}
                cols={30}
                rows={5}
                ></textarea>
              <button onClick={() => addNewReply(message.id)}>
                Lähetä vastaus
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageArea;

// {houseToEdit.users.map((user) => {
//   if (user.id === item.userWhoAddedId) {
//     return (
//       <div key={user.id}>
//         {user.username}
//       </div>
//     )
//   }
// })}
