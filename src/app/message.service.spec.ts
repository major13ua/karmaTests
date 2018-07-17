import {MessageService} from './message.service';

describe('MessageService', () => {
  let service: MessageService;


  beforeEach(() => {
    service = new MessageService();
  });

  it('it should have no messages on start', () => {
    expect(service.messages.length).toBe(0);
  });

  it('should add message', () => {
    service.add('message1');
    expect(service.messages.length).toBe(1);
  });

  it('should delete message', () => {
    service.add('message1');
    service.clear();
    expect(service.messages.length).toBe(0);
  })

})
