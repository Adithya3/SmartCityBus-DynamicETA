import { SupervisorPage } from './app.po';

describe('supervisor App', () => {
  let page: SupervisorPage;

  beforeEach(() => {
    page = new SupervisorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
