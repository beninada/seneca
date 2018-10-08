export function getUsers(params = {}) {
  return fetch('/api/users', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
}
