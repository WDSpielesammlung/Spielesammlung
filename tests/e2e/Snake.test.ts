import { expect, test } from '@playwright/test';
import { db } from '../../src/lib/database';

test('redirect if user is not logged in', async ({ page }) => {
	await page.goto('/games/snake');
	await expect(page).toHaveURL('/login');
});

test('register and start playing a game that is better than SpaceInvaders', async ({ page }) => {
	await page.goto('games/snake');
	//redirect zu Login
	await expect(page).toHaveURL('/login');
	await page.getByText('Sign Up').click();
	//redirect zu Registrierung
	await expect(page).toHaveURL('/register');
	await page.getByPlaceholder('Username').fill('SnakeTest');
	await page.getByPlaceholder('E-Mail').fill('Snake@Test.com');
	await page.getByPlaceholder('Password', { exact: true }).fill('SnakePassword');
	await page.getByPlaceholder('repeat password', { exact: true }).fill('SnakePassword');
	await page.getByText('Register', { exact: true }).click();
	//nach Registrierung redirect zum Spiel
	await expect(page).toHaveURL('/games/snake');
    //after snake was opened game will start
	try {
		await db.user.delete({
			where: { username: 'SnakeTest' }
		});
	} catch (err) {
		console.log('DB connection failed error:' + err);
	}
});
