export function validate(values, mode) {
  const errors = {};
  if (mode === 'signup' && !values.name?.trim()) errors.name = 'Indiquez votre nom complet.';
  if (!values.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Indiquez une adresse e-mail valide.';
  }
  if (!values.password) errors.password = 'Indiquez votre mot de passe.';
  else if (mode === 'signup' && values.password.length < 8) errors.password = 'Utilisez au moins 8 caractères.';
  if (mode === 'signup' && values.password !== values.confirmation) errors.confirmation = 'Les mots de passe ne correspondent pas.';
  return errors;
}

export function dashboardDestination(value, origin) {
  if (!value || typeof value !== 'string') return null;
  const url = new URL(value, origin);
  if (url.origin !== origin || !['http:', 'https:'].includes(url.protocol)) {
    throw new Error('La destination du dashboard doit être sur le même domaine.');
  }
  return url.href;
}

export async function authenticate(mode, values, config, adapter) {
  if (!['login', 'signup'].includes(mode)) throw new Error('Action non disponible.');
  if (config.mode === 'demo') {
    await new Promise(resolve => setTimeout(resolve, 650));
    return { demo: true, authenticated: false };
  }
  if (config.mode !== 'live') throw new Error('Configuration de connexion invalide.');
  const action = mode === 'signup' ? 'signUp' : 'signIn';
  if (typeof adapter?.[action] !== 'function') {
    throw new Error('Le service de connexion n’est pas encore disponible.');
  }
  const payload = { email: values.email.trim(), password: values.password };
  if (mode === 'signup') payload.name = values.name.trim();
  const result = await adapter[action](payload);
  if (!result || typeof result.authenticated !== 'boolean') {
    throw new Error('La connexion n’a pas pu être confirmée. Réessayez.');
  }
  if (mode === 'login' && !result.authenticated) {
    throw new Error(result.message || 'La connexion n’a pas pu être confirmée. Réessayez.');
  }
  return { authenticated: result.authenticated, message: result.message, demo: false };
}
