import { expect, test } from '@playwright/test';
import { db } from '../../src/lib/database';

test('check if all game links are working when click', async ({ page }) => {
	await page.goto('/')
	await page.click('button[id="flappyBird0"]', {force: true})
	await expect(page).toHaveURL('/login');
	await page.getByText('Sign Up').click();
	//redirect zu Registrierung
	await expect(page).toHaveURL('/register');
	await page.getByPlaceholder('Username').fill('HomepageTest');
	await page.getByPlaceholder('E-Mail').fill('Homepage@Test.com');
	await page.getByPlaceholder('Password', { exact: true }).fill('HomepagePassword');
	await page.getByPlaceholder('repeat password', { exact: true }).fill('HomepagePassword');
	await page.getByText('Register', { exact: true }).click();
	await expect(page).toHaveURL('/games/flappyBird');
	await page.goto('/');
	await page.click('button[id="snake1"]', {force: true});
	await expect(page).toHaveURL('/games/snake');
	await page.goto('/');
	await page.click('button[id="spaceInvader2"]', {force: true});
	await expect(page).toHaveURL('/games/SpaceInvaders');
	await page.goto('/');
	await page.click('button[id="wordle3"]', {force: true});
	await expect(page).toHaveURL('/games/wordle');
	await page.goto('/');
	try {
		await db.user.delete({
			where: { username: 'HomepageTest' }
		});
	} catch (err) {
		console.log('DB connection failed error:' + err);
	}
});

