/**
 * index
 *
 * @author Mojahedul Hoque Abul Hasanat <just.unix@gmail.com>
 */

module.exports = {
    format: format,
    formatFixed: formatFixed
}

/**
 * Format a number with commas according to the Indian number system. You can read about this system here:
 * {@link https://en.wikipedia.org/wiki/Indian_numbering_system}.
 *
 * If the input is anything but a number, it is returned unchanged. It uses `parseFloat` to cleanup the input.
 * The idiosyncrasies of parseFloat will be present here. e.g. '123a' will be converted to '123'. Booleans will
 * be considered as non-number and will be returned unchanged.
 *
 * @param {number|string|Number} original The number to be formatted.
 *                               Can be a primitive number, string or a Number object.
 * @returns {string} The formatted number as a string. Returns the input unchanged if it was not a number.
 */
function format(original) {
    var originalNumber = parseFloat(original)

    // Skip formatting if it's not a numeric value
    if (!isFinite(originalNumber)) {
        return original
    }

    return _formatAfterCleanup(originalNumber)
}

/**
 * Same as #format except that it converts the input number to a fixed precision number before processing. The
 * return number will have the specified number of decimals. Useful for money values.
 *
 * @param {number|string|Number} original The number to be formatted.
 *                               Can be a primitive number, string or a Number object.
 * @param {number } decimals Number of desired decimals in the result. Defaults to zero if not specified.
 * @returns {string} The formatted number as a string. Returns the input unchanged if it was not a number.
 */
function formatFixed(original, decimals) {
    var originalFloat = parseFloat(original)

    // Skip formatting if it's not a numeric value
    if (!isFinite(originalFloat)) {
        return original
    }

    return _formatAfterCleanup(originalFloat.toFixed(decimals))
}

function _formatAfterCleanup(originalNumber) {
    var originalMag
    var negative

    if (originalNumber < 0) {
        originalMag = -1 * originalNumber
        negative = true
    } else {
        originalMag = originalNumber
        negative = false
    }

    var arr = String(originalMag).split('').reverse()
    var start = arr.indexOf('.') + 1
    var i
    var result = []

    // copy the fractional part
    for (i = 0; i < start; i++) {
        result.push(arr[i])
    }

    if (arr[i] === '.') {
        result.push('.')
    }

    // main loop
    var j = 0
    for (i = start; i < arr.length; i++) {
        result.push(arr[i])
        j++
        if ((j === 3 || j === 5 || j === 7) && (i < arr.length - 1)) {
            result.push(',')
        }
        if (j === 7) {
            j = 0
        }
    }

    if (negative) {
        result.push('-')
    }

    return result.reverse().join('')
}
