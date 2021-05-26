import { Constants } from '../../constants'
import { t } from 'testcafe'
import DashboardPage from '../pages/DashboardPage'
import QuizPage from '../pages/QuizPage'

const dashboardPage = new DashboardPage()
const quizPage = new QuizPage()

export async function goToQuizWithName(name: string) {
	await t
		.expect(dashboardPage.header.innerText)
		.eql(Constants.DASHBOARD_HEADER)
		.expect(dashboardPage.card().withText(name).exists)
		.ok()
		.click(dashboardPage.card().withText(name))
		.expect(quizPage.header.withText(name).exists)
		.ok()
}
