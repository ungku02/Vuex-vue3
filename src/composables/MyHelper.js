export function MyHelper() {
    const capitalizeWord = (str) => {
        return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')
    }
    return {capitalizeWord}
}