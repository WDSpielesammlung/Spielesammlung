import { expect, test } from '@playwright/test';
import { db } from '../../src/lib/database';

test('redirect if user is not logged in', async ({ page }) => {
	await page.goto('/games/wordle');
	await expect(page).toHaveURL('/login');
});

test('register and start playing wordle', async ({ page }) => {
	await page.goto('games/wordle');
	//redirect zu Login
	await expect(page).toHaveURL('/login');
	await page.getByText('Sign Up').click();
	//redirect zu Registrierung
	await expect(page).toHaveURL('/register');
	await page.getByPlaceholder('Username').fill('WordleTest');
	await page.getByPlaceholder('E-Mail').fill('Wordle@Test.com');
	await page.getByPlaceholder('Password', { exact: true }).fill('WordlePassword');
	await page.getByPlaceholder('repeat password', { exact: true }).fill('WordlePassword');
	await page.getByText('Register', { exact: true }).click();
	//nach Registrierung redirect zum Spiel
	await expect(page).toHaveURL('/games/wordle');
	//after Worlde was opened game is ready to start
	try {
		await db.user.delete({
			where: { username: 'WordleTest' }
		});
	} catch (err) {
		console.log('DB connection failed error:' + err);
	}
});
