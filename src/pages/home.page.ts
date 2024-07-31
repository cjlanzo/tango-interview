import { Locator, Page } from '@playwright/test';
import { NewTangoModal } from '../components/new-tango.comp';
import { NewFolderModal } from '../components/new-folder.comp';

export class HomePage {
  readonly newTangoBtn: Locator;
  readonly newFolderBtn: Locator;
  readonly folders: FolderTable;
  readonly displayBtn: Locator;

  constructor(readonly page: Page) {
    this.newTangoBtn = this.page.getByTestId('header.captureWorkflowButton');
    this.newFolderBtn = this.page.getByTestId(
      'shared.modals.upsertFolderModal.trigger'
    );

    this.folders = new FolderTable(this.page, this.page.getByRole('table'));
    this.displayBtn = this.page.locator('div[type=button]', {
      has: this.page.getByTestId('workflowsList.actions.displayOptions.toggle'),
    });
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

  async changeDisplayToList() {
    await this.displayBtn.click();
    await this.page.locator('input[aria-label="Select list view"]').click();
    // Close the modal
    await this.page.keyboard.press('Escape');
  }
}

class FolderTable {
  constructor(readonly page: Page, readonly base: Locator) {}

  getFolder(folderName: string) {
    return this.base.locator('tr[data-testid*=folder-list-item]', {
      hasText: folderName,
    });
  }
}
