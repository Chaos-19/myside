/**
 * Utility functions for board member display logic.
 * Extracted for testability.
 */

/**
 * Generates initials from a name for placeholder avatars.
 * Returns 1-2 uppercase letters derived from the first characters of name parts.
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Formats the display name with optional title prefix.
 * If title exists, prepends it with a space. Otherwise returns just the name.
 */
export const formatDisplayName = (name: string, title?: string): string => {
  return title ? `${title} ${name}` : name;
};

/**
 * Determines if a degree should be displayed.
 * Returns the degree if it's a non-empty string, otherwise undefined.
 */
export const shouldDisplayDegree = (degree?: string): string | undefined => {
  return degree && degree.trim() !== '' ? degree : undefined;
};
