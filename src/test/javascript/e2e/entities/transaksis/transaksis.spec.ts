// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TransaksisComponentsPage, TransaksisDeleteDialog, TransaksisUpdatePage } from './transaksis.page-object';

const expect = chai.expect;

describe('Transaksis e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let transaksisComponentsPage: TransaksisComponentsPage;
  let transaksisUpdatePage: TransaksisUpdatePage;
  let transaksisDeleteDialog: TransaksisDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Transakses', async () => {
    await navBarPage.goToEntity('transaksis');
    transaksisComponentsPage = new TransaksisComponentsPage();
    await browser.wait(ec.visibilityOf(transaksisComponentsPage.title), 5000);
    expect(await transaksisComponentsPage.getTitle()).to.eq('pustakaApp.transaksis.home.title');
  });

  it('should load create Transaksis page', async () => {
    await transaksisComponentsPage.clickOnCreateButton();
    transaksisUpdatePage = new TransaksisUpdatePage();
    expect(await transaksisUpdatePage.getPageTitle()).to.eq('pustakaApp.transaksis.home.createOrEditLabel');
    await transaksisUpdatePage.cancel();
  });

  it('should create and save Transakses', async () => {
    const nbButtonsBeforeCreate = await transaksisComponentsPage.countDeleteButtons();

    await transaksisComponentsPage.clickOnCreateButton();
    await promise.all([
      transaksisUpdatePage.setTanggalPinjamInput('2000-12-31'),
      transaksisUpdatePage.setTanggalKembaliInput('2000-12-31'),
      transaksisUpdatePage.userSelectLastOption(),
      transaksisUpdatePage.anggotasSelectLastOption(),
      transaksisUpdatePage.bukusSelectLastOption()
    ]);
    expect(await transaksisUpdatePage.getTanggalPinjamInput()).to.eq(
      '2000-12-31',
      'Expected tanggalPinjam value to be equals to 2000-12-31'
    );
    expect(await transaksisUpdatePage.getTanggalKembaliInput()).to.eq(
      '2000-12-31',
      'Expected tanggalKembali value to be equals to 2000-12-31'
    );
    await transaksisUpdatePage.save();
    expect(await transaksisUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await transaksisComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Transaksis', async () => {
    const nbButtonsBeforeDelete = await transaksisComponentsPage.countDeleteButtons();
    await transaksisComponentsPage.clickOnLastDeleteButton();

    transaksisDeleteDialog = new TransaksisDeleteDialog();
    expect(await transaksisDeleteDialog.getDialogTitle()).to.eq('pustakaApp.transaksis.delete.question');
    await transaksisDeleteDialog.clickOnConfirmButton();

    expect(await transaksisComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
