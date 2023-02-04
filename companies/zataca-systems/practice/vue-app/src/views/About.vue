<template>
	<div class="about">
		<PageTitle :title="pageTitle" />

		<section>
			<h2>Welcome to today's challenge!</h2>
			<p>
				In this test you will have the opportunity to demonstrate your skills in Vue.js and SCSS. The test will last approximately 1 hour and
				will focus on evaluating your skills to create a simple but functional application, as well as your knowledge.
			</p>

			Below, we will provide you with the tasks to perform during the test:
			<ol>
				<li>Create a Vue.js application from scratch with Vue CLI.</li>
				<li>
					Create a card component that displays information about a product, using SCSS for styling. For the design part, we want to see
					your creativity. The card should consist of a title and a description.
				</li>
				<li>
					Such a component will be used recursively in a product grid that is loaded by an API call to retrieve the data and display it in
					the application. The API to be used is
					<a href="https://jsonplacehlider.typicode.com/posts">
						https://jsonplacehlider.typicode.com/posts
					</a>
				</li>
				<li>
					Once this grid is created, we must include a search engine at the top that allows us to filter these cards looking for matches in
					title and/or description.
				</li>
				<li>
					Compress the files and send them to
					<a href="mailto:captacion.talento@zataca.com">
						captacion.talento@zataca.com
					</a>
					or upload them to your Git and send us the link, as you see fit! One way or another, specify us in the subject of the mail
					"FrontEnd level test - Name and surname" so we can know it's you. Any additions that you think will improve usability, as well as
					UX/UI optimization with loadings, header/footer structuring, etc. will be appreciated.
				</li>
			</ol>

			<p>Remember that this test is just a way to evaluate your skills at the moment. It's always possible to keep learning and improving.</p>

			<p>Best of luck, and see you on the other side! 😊</p>
		</section>
	</div>
</template>

<script>
	import PageTitle from "@/components/PageTitle";

	export default {
		"name": "About",
		"components": {
			PageTitle,
		},
		data() {
			return {
				"pageTitle": `This is an <span class="page-title__highlight">${this.$route.name}</span> page`,
			};
		},
	};
</script>
