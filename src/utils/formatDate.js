/**
 * Convert date object into string
 *
 * @param {Date} date
 * @returns {string} formatted string
 */
export default function formatDate(d) {
    return new Intl.DateTimeFormat('en', {year: 'numeric', month: "numeric", day: "numeric"}).format(d)
}
