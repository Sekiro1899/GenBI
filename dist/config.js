/** Public integration settings. Never put API secrets or tokens in this file. */
export const config = Object.freeze({
  mode: 'demo',
  dashboardUrl: '',
});

/** Replace with the project's existing service when moving to mode: 'live'.
 * Methods must return { authenticated: true } only for a verified session,
 * or { authenticated: false, message: '...' } for registration verification.
 * Keep session cookies, CSRF protection and authorization on your server.
 */
export const authAdapter = null;
