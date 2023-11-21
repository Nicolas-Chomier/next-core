export const capitalizeFirstLetters = (
	elem: string | undefined | null,
): string => {
	if (elem) {
		const array = elem.split('');
		const resultats = [];

		for (let i = 0; i < array.length; i++) {
			let letter = array[i];

			i === 0
				? resultats.push(letter.toUpperCase())
				: resultats.push(letter.toLowerCase());
		}
		return resultats.join('');
	}
	return '';
};
