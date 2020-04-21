import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appChatBlock]'
})
export class ChatBlockDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
