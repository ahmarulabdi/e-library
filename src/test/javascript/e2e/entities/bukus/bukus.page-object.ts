import { element, by, ElementFinder } from 'protractor';

export class BukusComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-bukus div table .btn-danger'));
  title = element.all(by.css('jhi-bukus div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class BukusUpdatePage {
  pageTitle = element(by.id('jhi-bukus-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  namaInput = element(by.id('field_nama'));
  pengarangInput = element(by.id('field_pengarang'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNamaInput(nama) {
    await this.namaInput.sendKeys(nama);
  }

  async getNamaInput() {
    return await this.namaInput.getAttribute('value');
  }

  async setPengarangInput(pengarang) {
    await this.pengarangInput.sendKeys(pengarang);
  }

  async getPengarangInput() {
    return await this.pengarangInput.getAttribute('value');
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class BukusDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-bukus-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-bukus'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
