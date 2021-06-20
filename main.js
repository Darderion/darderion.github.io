
const players = [
	"Никита Григорьев",	// 0
	"Никита Семёнов",	// 1
	"Егор",				// 2
	"Артём",			// 3
	"Александр",		// 4
	"Денис",			// 5
	"Андрей",			// 6
	"Никита Панк",		// 7
	"Владислав",		// 8
	"Василий"			// 9
]

const grades = [
	[ 2, 3,	3, 2, 3,		2, 2.5, 4, 3, 4 ],
	[ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1 ],
	[ 4, 3.5, 4, 1, 3,		2, 2, 2, 2.5, 3 ],
	[ 4, 4, 3, 3, 3.5,		2.5, 3.5, 4, 3, 3.5 ],
	[ 4, 4, 2.5, 2, 3.5,	3, 4, -1, 2, 4 ],
	[ 3, 5, 4, 3, 3.5,		3, 2, 5, 3, 4 ],
	[ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1 ],
	[ 3, 3.5, 3, 2.5, 2,	-1, -1, 4, 2, 2 ],
	[ 3, 4, 2.5, 2, 3.5,	3, 3, -1, 2, 2.5 ],
	[ 3, 4, 3, 2, 3,		1, 4, 2, 2, 2 ]
]

const sum = arr => {
	let val = 0

	arr.forEach(el => {
		val += el;
	})

	return val / arr.length;
}

const getScore = number => {
	if (number == -1) return -1;
	if (number <= 2) return 2 + (number - 1);
	if (number <= 3) return 3 + (number - 2) * 2;
	if (number <= 4) return 5 + (number - 3) * 2;
	if (number <= 5) return 7 + (number - 4) * 4;
}

const scores = grades.map(el => el.map(item => getScore(item)))

const playerGrades = [
]

grades.forEach((el, ind) => {
	const playerGrade = grades.map(el => el[ind]).filter((el, index) => ind != index).filter(el => el != -1)
	const playerScore = scores.map(el => el[ind]).filter((el, index) => ind != index).filter(el => el != -1)

	playerGrades[ind] = {
		id: ind,
		name: players[ind],
		average: Math.trunc(sum(playerGrade) * 100) / 100,
		score: Math.trunc(sum(playerScore) * 100) / 100,
	}
})

playerGrades.forEach(el => el.averageScore = getScore(el.average))

playerGrades.forEach(el => {
	console.log(`${el.name}: ${el.score}`)
})

function generateBinaryStrings(arr, n) {
	if (n == 0) return arr;
	const arr2 = []
	if (arr.length == 0) return generateBinaryStrings(["0", "1"], n - 1);
	arr.forEach(el => {
		arr2.push(`${el}0`)
		arr2.push(`${el}1`)
	})
	return generateBinaryStrings(arr2, n - 1)
}

playerGrades.forEach(el => {
	$('#mainDiv').append(`${el.name} : <input type="checkbox" id="checkbox${el.id}"><br>`)
	$(`#checkbox${el.id}`).change(function() {
		const curPlayers = playerGrades.filter(el => $(`#checkbox${el.id}`).prop('checked'))

		let max = 0;

		curPlayers.forEach(el => max += el.score)

		const binaryStrings = generateBinaryStrings([], curPlayers.length)

		let index = -1;
		let min = 1000;
		let teamScoreMin = 0;

		binaryStrings.forEach((el, ind) => {
			let sum = 0;
			let teamScore = 0;
			for (var i = 0; i < el.length; i++) {
				const item = el.charAt(i);
				sum += (item == "1") ? curPlayers[i].score : (-1) * curPlayers[i].score;
				teamScore += (item == "1") ? curPlayers[i].score : 0;
			}
			if (Math.abs(sum) < min) {
				min = Math.abs(sum)
				index = ind;
				teamScoreMin = teamScore;
			}
		})

		$('#teamA').html(`${binaryStrings[index]}<br>${max - teamScoreMin} vs ${teamScoreMin} | ${min}`)
	})
})
