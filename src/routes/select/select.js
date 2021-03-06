import { sender } from '../../constants/sender.js';
import { sendMessage } from '../../lib/sendMessage.js';
import { getMembers, selectMembers } from '../../lib/selectRandomMem.js';
import { checkText } from '../../lib/checkText.js';

const celebrate = (msg, groupId, botName) => {
  const body = {
    blocks: [
      {
        type: 'text',
        value: msg,
      },
    ],
    options: ['actAsManager'],
  };

  sendMessage(sender.GROUP, groupId, 'messages', { botName: botName }, body, 'post');
};

const personalAnnounce = (managerId, botName) => {
  const body = {
    blocks: [
      {
        type: 'text',
        value: 'πλΉμ²¨π μΆνλλ¦½λλ€!',
      },
    ],
    options: ['actAsManager'],
  };

  sendMessage(sender.ANNOUNCEMENTS, undefined, 'announce', { botName: botName, managerIds: managerId }, body, 'post');
};

export const select = async (plainText, keyword, groupId, botName) => {
  const [n, isInt, msg] = checkText(plainText, keyword);

  // negative number or real numbers
  if (msg) {
    const body = {
      blocks: [
        {
          type: 'text',
          value: msg,
        },
      ],
      options: ['actAsManager'],
    };
    sendMessage(sender.GROUP, groupId, 'messages', { botName: botName }, body, 'post');
  }

  if (n) {
    let isFull = true;

    const members = await getMembers(groupId);
    console.log(members);

    // member limit exceeded number
    if (members.length < n) {
      const body = {
        blocks: [
          {
            type: 'text',
            value: `π€’ μ¬κΈ° ${members.length}λͺ λ°μ μμ΄. μλΌ.`,
          },
        ],
        options: ['actAsManager'],
      };
      return sendMessage(sender.GROUP, groupId, 'messages', { botName: botName }, body, 'post');
    }

    const num = isInt ? n : Math.ceil(n);

    // unique random selection
    const managers = await selectMembers(members, num);

    let lastManager = undefined;
    if (!isInt) {
      lastManager = managers.pop();
    }

    let msg = '';
    const MAX_MSG_NUM = 15;

    if (managers.length > MAX_MSG_NUM) {
      managers.map((manager) => {
        personalAnnounce(manager.id, botName);
        msg += '\n' + 'πμΆνλλ¦½λλ€π ' + manager.name + ' λμ΄ λΉμ²¨λμμ΅λλ€!';
      });
      celebrate(msg, groupId, botName);
    } else {
      managers.map((manager) => {
        personalAnnounce(manager.id, botName);
        msg = 'πμΆνλλ¦½λλ€π ' + manager.name + ' λμ΄ λΉμ²¨λμμ΅λλ€!';
        celebrate(msg, groupId, botName);
      });
    }

    if (lastManager) {
      isFull = false;
      const name = lastManager.name;

      let halfName = '';

      if (!isFull) {
        for (let i = 0; i < name.length; i++) {
          if (i % 2 == 0) {
            halfName += name[i];
          } else {
            halfName += '*';
          }
        }
      }
      const msg = 'πμΆνλλ¦½λλ€π ' + halfName + ' λμ΄ λΉμ²¨λμμ΅λλ€!';
      celebrate(msg, groupId, botName);
    }
  }
};
