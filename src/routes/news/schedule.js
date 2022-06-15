import schedule from 'node-schedule';
import { getNews } from './scraping.js';
import { sender } from '../../constants/sender.js';
import { sendMessage } from '../../lib/sendMessage.js';

const groupId = 146628;
const botName = "DevKor";
const rule = new schedule.RecurrenceRule();

rule.dayOfWeek = [new schedule.Range(1, 6)];
rule.hour = 9;
rule.minute = 0;
rule.tz = 'Asia/Seoul'

export const newsScheduler = schedule.scheduleJob(rule, async () => {
    const [newsUrl, newsTitle] = await getNews();
    const body = {
        blocks: [
          {
            type: 'text',
            value: '🔥오늘의 Tech News🔥',
          },
          {
              type: 'text',
              value: `<link type="url" value="${newsUrl}">${newsTitle}</link>`   
          },  
          ],
          buttons: [
            {
              title: "바로가기",
              colorVariant: "purple",
              url: newsUrl,
            },
          ],
        options: ['actAsManager'],
      };
      sendMessage(sender.GROUP, groupId, 'messages', { botName: botName }, body, 'post');
})

