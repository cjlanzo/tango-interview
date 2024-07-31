import { Locator, Page } from '@playwright/test';

export class NewFolderModal {
  readonly base: Locator;

  readonly nameInput: Locator;
  readonly createFolderBtn: Locator;

  constructor(readonly page: Page) {
    this.base = this.page.getByTestId('shared.modals.upsertFolderModal.modal');

    this.nameInput = this.base.getByTestId(
      'shared.modals.upsertFolderModal.nameInput'
    );

    this.createFolderBtn = this.base.getByTestId(
      'shared.modals.upsertFolderModal.submitButton'
    );
  }

  async createFolder(folderName: string) {
    await this.nameInput.fill(folderName);
    await this.createFolderBtn.click();
  }
}
