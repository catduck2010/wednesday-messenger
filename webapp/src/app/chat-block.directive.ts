import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appChatBlock]'
})
export class ChatBlockDirective {
  // directive to show chat ui
  constructor(public viewContainerRef: ViewContainerRef) { }

}
