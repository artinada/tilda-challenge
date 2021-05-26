import axios from 'axios'
const axiosInstance = axios.create()

export async function apiCreateQuiz(name: string): Promise<string> {
	try {
		const response = await axiosInstance({
			method: 'POST',
			baseURL: 'https://tilda-quiz.hasura.app/v1/graphql',
			headers: {
				'content-Type': 'application/json',
			},
			timeout: 30000,
			data: {
				query: `mutation insertQuiz {
					insert_quizzes_one(object: {
						name: \"${name}\",
				  	questions: {
				  		data: [
				  			{text: \"Question 1\", options: \"opt1,opt2,opt3\", answer: \"opt1\"},
				  			{text: \"Question 2\", options: \"opt1,opt2,opt3\", answer: \"opt2\"},
				  			{text: \"Question 3\", options: \"opt1,opt2,opt3\", answer: \"opt3\"}
				  		]
				  	} 
				  })
				{ id } }`,
			},
		})
		if (!response.data.data?.insert_quizzes_one?.id) {
			throw new Error(
				'There is no data.data.delete_quizzes_by_pk.id in response'
			)
		}
		return response.data.data.insert_quizzes_one.id as string
	} catch (err) {
		console.log('Failed quiz creation', err)
		throw err
	}
}

export async function apiDeleteQuiz(id: string): Promise<void> {
	try {
		await axiosInstance({
			method: 'POST',
			baseURL: 'https://tilda-quiz.hasura.app/v1/graphql',
			headers: {
				'content-Type': 'application/json',
			},
			timeout: 30000,
			data: {
				query: `mutation deleteQuiz { delete_quizzes_by_pk(id: \"${id}\") { id } }`,
			},
		})
	} catch (err) {
		console.log('Failed quiz deletion', err)
		throw err
	}
}
