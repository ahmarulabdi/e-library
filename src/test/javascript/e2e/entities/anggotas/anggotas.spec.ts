// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AnggotasComponentsPage, AnggotasDeleteDialog, AnggotasUpdatePage } from './anggotas.page-object';

const expect = chai.expect;

describe('Anggotas e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let anggotasComponentsPage: AnggotasComponentsPage;
  let anggotasUpdatePage: AnggotasUpdatePage;
  let anggotasDeleteDialog: AnggotasDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Anggotas', async () => {
    await navBarPage.goToEntity('anggotas');
    anggotasComponentsPage = new AnggotasComponentsPage();
    await browser.wait(ec.visibilityOf(anggotasComponentsPage.title), 5000);
    expect(await anggotasComponentsPage.getTitle()).to.eq('pustakaApp.anggotas.home.title');
  });

  it('should load create Anggotas page', async () => {
    await anggotasComponentsPage.clickOnCreateButton();
    anggotasUpdatePage = new AnggotasUpdatePage();
    expect(await anggotasUpdatePage.getPageTitle()).to.eq('pustakaApp.anggotas.home.createOrEditLabel');
    await anggotasUpdatePage.cancel();
  });

  it('should create and save Anggotas', async () => {
    const nbButtonsBeforeCreate = await anggotasComponentsPage.countDeleteButtons();

    await anggotasComponentsPage.clickOnCreateButton();
    await promise.all([anggotasUpdatePage.setNamaInput('nama')]);
    expect(await anggotasUpdatePage.getNamaInput()).to.eq('nama', 'Expected Nama value to be equals to nama');
    await anggotasUpdatePage.save();
    expect(await anggotasUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await anggotasComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Anggotas', async () => {
    const nbButtonsBeforeDelete = await anggotasComponentsPage.countDeleteButtons();
    await anggotasComponentsPage.clickOnLastDeleteButton();

    anggotasDeleteDialog = new AnggotasDeleteDialog();
    expect(await anggotasDeleteDialog.getDialogTitle()).to.eq('pustakaApp.anggotas.delete.question');
    await anggotasDeleteDialog.clickOnConfirmButton();

    expect(await anggotasComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
