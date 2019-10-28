import { element, by, ElementFinder } from 'protractor';

export class TransaksisComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-transaksis div table .btn-danger'));
  title = element.all(by.css('jhi-transaksis div h2#page-heading span')).first();

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

export class TransaksisUpdatePage {
  pageTitle = element(by.id('jhi-transaksis-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  tanggalPinjamInput = element(by.id('field_tanggalPinjam'));
  tanggalKembaliInput = element(by.id('field_tanggalKembali'));
  userSelect = element(by.id('field_user'));
  anggotasSelect = element(by.id('field_anggotas'));
  bukusSelect = element(by.id('field_bukus'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTanggalPinjamInput(tanggalPinjam) {
    await this.tanggalPinjamInput.sendKeys(tanggalPinjam);
  }

  async getTanggalPinjamInput() {
    return await this.tanggalPinjamInput.getAttribute('value');
  }

  async setTanggalKembaliInput(tanggalKembali) {
    await this.tanggalKembaliInput.sendKeys(tanggalKembali);
  }

  async getTanggalKembaliInput() {
    return await this.tanggalKembaliInput.getAttribute('value');
  }

  async userSelectLastOption(timeout?: number) {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return await this.userSelect.element(by.css('option:checked')).getText();
  }

  async anggotasSelectLastOption(timeout?: number) {
    await this.anggotasSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async anggotasSelectOption(option) {
    await this.anggotasSelect.sendKeys(option);
  }

  getAnggotasSelect(): ElementFinder {
    return this.anggotasSelect;
  }

  async getAnggotasSelectedOption() {
    return await this.anggotasSelect.element(by.css('option:checked')).getText();
  }

  async bukusSelectLastOption(timeout?: number) {
    await this.bukusSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async bukusSelectOption(option) {
    await this.bukusSelect.sendKeys(option);
  }

  getBukusSelect(): ElementFinder {
    return this.bukusSelect;
  }

  async getBukusSelectedOption() {
    return await this.bukusSelect.element(by.css('option:checked')).getText();
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

export class TransaksisDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-transaksis-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-transaksis'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
