import { ChatBlockDirective } from './chat-block.directive';
import {ViewContainerRef} from '@angular/core';

describe('ChatBlockDirective', () => {
  it('should create an instance', () => {
    // @ts-ignore
    const directive = new ChatBlockDirective();
    expect(directive).toBeTruthy();
  });
});
