// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BukusComponentsPage, BukusDeleteDialog, BukusUpdatePage } from './bukus.page-object';

const expect = chai.expect;

describe('Bukus e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let bukusComponentsPage: BukusComponentsPage;
  let bukusUpdatePage: BukusUpdatePage;
  let bukusDeleteDialog: BukusDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Bukuses', async () => {
    await navBarPage.goToEntity('bukus');
    bukusComponentsPage = new BukusComponentsPage();
    await browser.wait(ec.visibilityOf(bukusComponentsPage.title), 5000);
    expect(await bukusComponentsPage.getTitle()).to.eq('pustakaApp.bukus.home.title');
  });

  it('should load create Bukus page', async () => {
    await bukusComponentsPage.clickOnCreateButton();
    bukusUpdatePage = new BukusUpdatePage();
    expect(await bukusUpdatePage.getPageTitle()).to.eq('pustakaApp.bukus.home.createOrEditLabel');
    await bukusUpdatePage.cancel();
  });

  it('should create and save Bukuses', async () => {
    const nbButtonsBeforeCreate = await bukusComponentsPage.countDeleteButtons();

    await bukusComponentsPage.clickOnCreateButton();
    await promise.all([bukusUpdatePage.setNamaInput('nama'), bukusUpdatePage.setPengarangInput('pengarang')]);
    expect(await bukusUpdatePage.getNamaInput()).to.eq('nama', 'Expected Nama value to be equals to nama');
    expect(await bukusUpdatePage.getPengarangInput()).to.eq('pengarang', 'Expected Pengarang value to be equals to pengarang');
    await bukusUpdatePage.save();
    expect(await bukusUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await bukusComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Bukus', async () => {
    const nbButtonsBeforeDelete = await bukusComponentsPage.countDeleteButtons();
    await bukusComponentsPage.clickOnLastDeleteButton();

    bukusDeleteDialog = new BukusDeleteDialog();
    expect(await bukusDeleteDialog.getDialogTitle()).to.eq('pustakaApp.bukus.delete.question');
    await bukusDeleteDialog.clickOnConfirmButton();

    expect(await bukusComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
