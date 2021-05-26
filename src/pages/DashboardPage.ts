import { Selector } from 'testcafe'
import BasePage from './BasePage'

class DashboardPage extends BasePage {
	card: Selector = Selector('[data-testid="quiz-card"]')

	async getScoreForQuiz(quizName: string): Promise<string> {
		return this.card.withText(quizName).find('[data-testid="quiz-score"]')
			.innerText
	}
}

export default DashboardPage
