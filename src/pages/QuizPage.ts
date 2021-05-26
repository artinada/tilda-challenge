import { Selector, t } from 'testcafe'
import BasePage from './BasePage'
import { Constants } from '../../constants'
import DashboardPage from './DashboardPage'

const dashboardPage = new DashboardPage()

class QuizPage extends BasePage {
	backButton: Selector = Selector('[aria-label="Back"]')
	inputField: Selector = Selector('input')
	inputLabel: Selector = Selector('div.chakra-stack label')
	checkedInput: Selector = Selector('div.data-checked')
	navigateBackButton: Selector = Selector('[data-testid="question-back"]')
	navigateNextButton: Selector = Selector('[data-testid="question-next"]')

	async selectAnswer(order: number) {
		await t
			.click(this.inputLabel.nth(order - 1))
			.expect(
				this.inputLabel
					.nth(order - 1)
					.child()
					.withAttribute('data-checked').exists
			)
			.ok()
	}

	async goToNextQuestionPage() {
		await t
			.expect(this.navigateNextButton().exists)
			.ok()
			.click(this.navigateNextButton)
	}

	async goToPreviousQuestionPage() {
		await t
			.expect(this.navigateBackButton().exists)
			.ok()
			.click(this.navigateBackButton)
	}

	async goBackToDashboardPage() {
		await t
			.expect(this.backButton().exists)
			.ok()
			.click(this.backButton)
			.expect(dashboardPage.header.innerText)
			.eql(Constants.DASHBOARD_HEADER)
	}
}

export default QuizPage
