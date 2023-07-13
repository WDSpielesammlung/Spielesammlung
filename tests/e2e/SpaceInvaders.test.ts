import { expect, test } from '@playwright/test';
import { db } from '../../src/lib/database';

test('redirect if user is not logged in', async ({ page }) => {
	await page.goto('/games/SpaceInvaders');
	await expect(page).toHaveURL('/login');
});

test('register and start playing the best game on this website', async ({ page }) => {
	await page.goto('games/SpaceInvaders');
	//redirect zu Login
	await expect(page).toHaveURL('/login');
	await page.getByText('Sign Up').click();
	//redirect zu Registrierung
	await expect(page).toHaveURL('/register');
	await page.getByPlaceholder('Username').fill('SpaceInvadersTest');
	await page.getByPlaceholder('E-Mail').fill('SpaceInvaders@Test.com');
	await page.getByPlaceholder('Password', { exact: true }).fill('extremlySafePassword');
	await page.getByPlaceholder('repeat password', { exact: true }).fill('extremlySafePassword');
	await page.getByText('Register', { exact: true }).click();
	//nach Registrierung redirect zum Spiel
	await expect(page).toHaveURL('/games/SpaceInvaders');
	await page.getByText('Play').click();

	const screenWidth = await page.evaluate(() => window.screen.width);
	const screenHeight = await page.evaluate(() => window.screen.height);
	const innerWidth = await page.evaluate(() => window.innerWidth);
	let innerHeight = await page.evaluate(() => window.innerHeight);

	//wenn sich der Browser im Vollbildmodus befindet, wurde das Spiel erfolgreich gestartet
	//also screenHeight = innerHeight etc.
	expect(screenHeight).toEqual(innerHeight);
	expect(screenWidth).toEqual(innerWidth);
	try {
		await db.user.delete({
			where: { username: 'SpaceInvadersTest' }
		});
	} catch (err) {
		console.log('DB connection failed error:' + err);
	}
});
