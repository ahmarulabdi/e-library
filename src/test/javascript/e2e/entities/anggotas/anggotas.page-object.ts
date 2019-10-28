import { element, by, ElementFinder } from 'protractor';

export class AnggotasComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-anggotas div table .btn-danger'));
  title = element.all(by.css('jhi-anggotas div h2#page-heading span')).first();

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

export class AnggotasUpdatePage {
  pageTitle = element(by.id('jhi-anggotas-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  namaInput = element(by.id('field_nama'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNamaInput(nama) {
    await this.namaInput.sendKeys(nama);
  }

  async getNamaInput() {
    return await this.namaInput.getAttribute('value');
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

export class AnggotasDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-anggotas-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-anggotas'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
