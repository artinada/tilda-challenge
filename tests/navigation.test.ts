import { apiCreateQuiz, apiDeleteQuiz } from '../src/helpers/api'
import { goToQuizWithName } from '../src/helpers/goToQuizWithName'
import DashboardPage from '../src/pages/DashboardPage'
import QuizPage from '../src/pages/QuizPage'

const dashboardPage = new DashboardPage()
const quizPage = new QuizPage()
const quizName = 'Quiz Navigation'
let quizId =''

fixture`Dashboard`
	.page`https://tilda-quiz.vercel.app`
	.before(async () => {
		quizId = await apiCreateQuiz(quizName)})
	.after(async() => {
		await apiDeleteQuiz(quizId)})


test('go to quiz by name', async t => {
	await goToQuizWithName(quizName)
	await t
		.expect(quizPage.inputField.count).gt(1)
		.expect(quizPage.checkedInput.exists).notOk()
	// how to define it's a first question page? should be shown a question's number?
	// should "navigateBackButton" be unavailable if it's the first question?
	//	t.expect(quizPage.navigateBackButton().visible).notOk()
})

test('go back to dashboard from quiz', async () => {
	await goToQuizWithName(quizName)
	await quizPage.goBackToDashboardPage()
})

test('navigate to the next question and go back to dashboard', async () => {
	await goToQuizWithName(quizName)
	await quizPage.goToNextQuestionPage()
	// here should be a check that question page has changed
	await quizPage.goBackToDashboardPage()
})

test('navigate to the next question and go to the previous question', async t => {
	await goToQuizWithName(quizName)
	await quizPage.goToNextQuestionPage()
	// here should be a check that question page has changed
	await quizPage.goToPreviousQuestionPage
	await t.expect(dashboardPage.header.innerText).eql(quizName)
})

// should "navigateNextButton" be unavailable if it's the last question?
test.skip('navigate to the last question', async t => {
	await goToQuizWithName(quizName)
	await quizPage.goToNextQuestionPage()
	await quizPage.goToNextQuestionPage()
	await t.expect(quizPage.navigateNextButton().visible).notOk()
})



