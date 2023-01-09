<script setup lang="ts">
const partsList = [
	{
		heading: 'タブ',
		description: 'タブ切り替えパーツ',
		list: [
			{
				title: 'タブ01',
				path: '/tab/index.html',
				description: 'バニラtsでの作成'
			}
		]
	}
]
</script>

<template>
	<div class="container">
		<section class="section" v-for="item in partsList">
			<h2 class="title is-spaced">{{ item.heading }}</h2>
			<p class="subtitle" v-if="item.description">{{ item.description }}</p>
			<ul v-for="list in item.list">
				<li class="box">
					<p class="title">
						<a :href="list.path">{{ list.title }}</a>
					</p>
					<p class="subtitle" v-if="list.description">{{ list.description }}</p>
					<!-- <p v-else>説明なし</p> -->
				</li>
			</ul>
		</section>
	</div>
</template>
