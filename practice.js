class client {
  constructor(helptDesk) {   
    this.helpDeskEm = helpDesk;
  }
  fix() {   
    this.helpDeskEm.restart();
  }
}
class helpDesk{
  constructor(step1, step2) {   
    this.step1 = step1;   
    this.step2 = step2;
  }
  restart() {
    step1.unplug();
    step2.PlugBackIn();
  }
}
