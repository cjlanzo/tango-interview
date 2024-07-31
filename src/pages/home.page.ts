import { Locator, Page } from '@playwright/test';
import { NewTangoModal } from '../components/new-tango.comp';
import { NewFolderModal } from '../components/new-folder.comp';

export class HomePage {
  readonly newTangoBtn: Locator;
  readonly newFolderBtn: Locator;

  constructor(readonly page: Page) {
    this.newTangoBtn = this.page.getByTestId('header.captureWorkflowButton');
    this.newFolderBtn = this.page.getByTestId(
      'shared.modals.upsertFolderModal.trigger'
    );
  }

  // Could customize this to make it so I can click a specific tab, but for now default to the first tab
  // Didn't end up using this
  async createTango(tabIndex: number = 0) {
    await this.newTangoBtn.click();

    const newTangoModal = new NewTangoModal(this.page);
    newTangoModal.start(tabIndex);
  }

  async createFolder(folderName: string) {
    await this.newFolderBtn.click();

    const newFolderModal = new NewFolderModal(this.page);
    await newFolderModal.createFolder(folderName);
  }
}
