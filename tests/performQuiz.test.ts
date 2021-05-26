import { apiCreateQuiz, apiDeleteQuiz } from '../src/helpers/api'
import { Constants } from '../constants'
import { goToQuizWithName } from '../src/helpers/goToQuizWithName'
import DashboardPage from '../src/pages/DashboardPage'
import QuizPage from '../src/pages/QuizPage'

const dashboardPage = new DashboardPage()
const quizPage = new QuizPage()
const quizName = 'Quiz Questions'
let quizId =''

fixture`Perform quiz`
	.page`https://tilda-quiz.vercel.app`
	.before(async () => {
		quizId = await apiCreateQuiz(quizName)})
	.after(async () => {
		await apiDeleteQuiz(quizId)})


test('answer all questions correctly', async t => {
	await goToQuizWithName(quizName)
	await t.expect(quizPage.checkedInput.exists).notOk()
	await quizPage.selectAnswer(1)
	await quizPage.goToNextQuestionPage()
	console.log('First step finished')

	// go to 2.question
	await t.expect(quizPage.checkedInput.exists).notOk()
	await quizPage.selectAnswer(2)
	await quizPage.goToNextQuestionPage()
	console.log('Second step finished')

	// go to 3.question
	await t.expect(quizPage.checkedInput.exists).notOk()
	await quizPage.selectAnswer(3)
	await quizPage.goToNextQuestionPage()
	console.log('Third step finished')

	// go to Dashboard
	await t.expect(dashboardPage.header.innerText).eql(Constants.DASHBOARD_HEADER)
	const currentScore = await dashboardPage.getScoreForQuiz(quizName)
	await t.expect(currentScore).eql('Score: 3/3')
})

test('not a single correct answer', async t => {
	await goToQuizWithName(quizName)
	await t.expect(quizPage.checkedInput.exists).notOk()
	await quizPage.selectAnswer(3)
	await quizPage.goToNextQuestionPage()
	console.log('First step finished')

	// go to 2.question
	await t.expect(quizPage.checkedInput.exists).notOk()
	await quizPage.selectAnswer(1)
	await quizPage.goToNextQuestionPage()
	console.log('Second step finished')

	// go to 3.question
	await t.expect(quizPage.checkedInput.exists).notOk()
	await quizPage.selectAnswer(2)
	await quizPage.goToNextQuestionPage()
	console.log('Third step finished')

	// go to Dashboard
	await t.expect(dashboardPage.header.innerText).eql(Constants.DASHBOARD_HEADER)
	const currentScore = await dashboardPage.getScoreForQuiz(quizName)
	await t.expect(currentScore).eql('Score: 0/3')
})

test('answer only one question', async t => {
	await goToQuizWithName(quizName)
	await t.expect(quizPage.checkedInput.exists).notOk()
	await quizPage.selectAnswer(1)
	await quizPage.goToNextQuestionPage()
	console.log('First step finished')

	// go to 2.question
	await quizPage.goToNextQuestionPage()
	console.log('Second step skipped')

	// go to 3.question
	await quizPage.goToNextQuestionPage()
	console.log('Third step skipped')

	// go to Dashboard
	await t.expect(dashboardPage.header.innerText).eql(Constants.DASHBOARD_HEADER)
	const currentScore = await dashboardPage.getScoreForQuiz(quizName)
	await t.expect(currentScore).eql('Score: 1/3')
})

// go back and change answer (to correct)

// go back and change answer (to incorrect)

// don't give any answer



