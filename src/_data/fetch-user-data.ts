/**
 * Fetches hardcoded user data.
 *
 * @deprecated This function currently returns static placeholder data for a user.
 *             It should be updated to fetch actual user data from an appropriate source (e.g., authentication context or API).
 *
 * @returns {{ user: { name: string; email: string; avatar: null } }} An object containing static user details.
 */
export const fetchUserData = () => {
  return {
    user: {
      name: 'webmaster',
      email: 'webmaster@example.com',
      avatar: null,
    },
  }
}
