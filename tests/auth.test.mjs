import { test } from 'node:test';
import assert from 'node:assert/strict';
import { authenticate, dashboardDestination, validate } from '../dist/auth.js';

const values = { name: 'Alex Démo', email: ' demo@example.com ', password: 'Exemple-2026', confirmation: 'Exemple-2026' };

test('registration reports invalid fields and password mismatch', () => {
  assert.deepEqual(validate(values, 'signup'), {});
  const errors = validate({ name: ' ', email: 'invalid', password: 'short', confirmation: 'different' }, 'signup');
  assert.deepEqual(Object.keys(errors), ['name', 'email', 'password', 'confirmation']);
});
test('existing login passwords are not subject to new-account policy', () => {
  assert.deepEqual(validate({ email: 'demo@example.com', password: 'short' }, 'login'), {});
});
test('demo never calls live authentication or reports a real authenticated session', async () => {
  const result = await authenticate('login', values, { mode: 'demo' }, { signIn() { assert.fail('Live adapter called in demo'); } });
  assert.deepEqual(result, { demo: true, authenticated: false });
});
test('live mode fails closed without an adapter and rejects ambiguous responses', async () => {
  await assert.rejects(authenticate('login', values, { mode: 'live' }, null));
  await assert.rejects(authenticate('login', values, { mode: 'live' }, { signIn: async () => ({ ok: true }) }));
  await assert.rejects(authenticate('login', values, { mode: 'typo' }, null));
  await assert.rejects(authenticate('login', values, { mode: 'live' }, { signIn: async () => ({ authenticated: false }) }));
});
test('registration verification preserves unauthenticated state and excludes confirmation from payload', async () => {
  const result = await authenticate('signup', values, { mode: 'live' }, { signUp: async payload => {
    assert.deepEqual(payload, { name: 'Alex Démo', email: 'demo@example.com', password: 'Exemple-2026' });
    return { authenticated: false, message: 'Vérifiez votre messagerie.' };
  } });
  assert.equal(result.authenticated, false);
  assert.equal(result.demo, false);
});
test('dashboard destination must be explicit and on the same origin', () => {
  const origin = 'https://genbi.example';
  assert.equal(dashboardDestination('', origin), null);
  assert.equal(dashboardDestination('/dashboard', origin), 'https://genbi.example/dashboard');
  assert.throws(() => dashboardDestination('//other.example', origin));
  assert.throws(() => dashboardDestination('javascript:alert(1)', origin));
});
