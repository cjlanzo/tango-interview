import { Locator, Page } from '@playwright/test';

// I didn't end up using this but this is how I would represent new modals
export class NewTangoModal {
  readonly base: Locator;

  readonly startCaptureBtn: Locator;
  // This will return multiple locators that we can filter down later
  readonly tabs: Locator;

  constructor(readonly page: Page) {
    this.base = this.page.getByTestId('shared.modals.newWorkflowModal');

    this.startCaptureBtn = this.base.getByTestId(
      'shared.modals.newWorkflowModal.confirmButton'
    );

    this.tabs = this.base.getByTestId('shared.modals.newWorkflowModal.tab');
  }

  // Could customize this to make it so I can click a specific tab, but for now default to the first tab
  async start(tabIndex: number = 0) {
    await this.tabs.nth(tabIndex).click();
    await this.startCaptureBtn.click();
  }
}
