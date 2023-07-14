import { expect, test } from '@playwright/test';
import { db } from '../../src/lib/database';

test('check if all navbar elements redirect right', async ({ page }) => {
    
    await page.goto('/')
    await page.getByRole('listitem').filter({hasText: "Flappy Bird"}).click()
    await expect(page).toHaveURL('/#flappyBird')
    await page.getByRole('listitem').filter({hasText: "Snake"}).click()
    await expect(page).toHaveURL('/#snake')
    await page.getByRole('listitem').filter({hasText: "Space Invaders"}).click()
    await expect(page).toHaveURL('/#spaceInvader')
    await page.getByRole('listitem').filter({hasText: "Wordle"}).click()
    await expect(page).toHaveURL('/#wordle')
    await page.getByRole('listitem').filter({hasText: "Login"}).click()
    await expect(page).toHaveURL('/login')
    await page.getByText('Sign Up').click();
	//redirect zu Registrierung
	await expect(page).toHaveURL('/register');
	await page.getByPlaceholder('Username').fill('NavbarTest');
	await page.getByPlaceholder('E-Mail').fill('Navbar@Test.com');
	await page.getByPlaceholder('Password', { exact: true }).fill('NavbarPassword');
	await page.getByPlaceholder('repeat password', { exact: true }).fill('NavbarPassword');
	await page.getByText('Register', { exact: true }).click();
    await page.goto('/')
    await page.getByRole('listitem').filter({hasText: "Profile"}).click()
    await expect(page).toHaveURL('/profile')
    await page.getByRole('listitem').filter({hasText: "Impressum"}).click()
    await expect(page).toHaveURL('/impressum')

    try {
		await db.user.delete({
			where: { username: 'NavbarTest' }
		});
	} catch (err) {
		console.log('DB connection failed error:' + err);
	}

})