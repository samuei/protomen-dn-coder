const band1 = [ 'A', 'C', 'T', '3', 'Z', 'K', 'W', 'F', '1', 'X', 'G', 'Q', 'E', 'O', 'J', 'L', 'D', '9', 'B', 'V', 'S', '5', '7', 'I', 'P', '2', '0', '6', 'U', 'M', '4', 'R', 'H', 'N', 'Y', '8' ];
const band2 = [ '2', '28', '21', '34', '7', '16', '30', '5', '1', '22', '13', '10', '18', '26', '31', '24', '17', '4', '29', '12', '8', '35', '6', '23', '15', '9', '33', '3', '20', '11', '36', '27', '14', '25', '19', '32' ];

const convert = () => {
	let inText = document.getElementById('inputBox').value?.toUpperCase() ?? '';
	const leftCode = document.getElementById('left-code').value ?? 'A';
	const rightCode = document.getElementById('right-code').value ?? '2';
	
	let leftBand = band1,
		rightBand = band2,
		offset = leftBand.indexOf(leftCode) - rightBand.indexOf(rightCode);
	if (document.querySelector('input[name=direction]:checked').value == 'decode') {
		leftBand = band2;
		rightBand = band1;
		inText = inText.split(/\s/);
		offset = leftBand.indexOf(rightCode) - rightBand.indexOf(leftCode);
	}
	
	let encodedText = '';
	
	for (const entry of inText) {
		if (!leftBand.includes(entry)) {
			encodedText += entry;
			continue;
		}
		
		let targetKey = leftBand.indexOf(entry) - offset;
		
		if (targetKey > 35) {
			targetKey -= 36;
		} else if (targetKey < 0) {
			targetKey += 36;
		}
		
		encodedText += rightBand[targetKey] + ' ';
	}
	
	document.getElementById('output').innerText = encodedText;
};

window.onload = () => {
	document.getElementById('inputBox').addEventListener('input', convert);
	document.getElementById('left-code').addEventListener('input', convert);
	document.getElementById('right-code').addEventListener('input', convert);
	document.querySelectorAll('input[name=direction]').forEach((radio) => {
		radio.addEventListener('change', convert);
	});
};