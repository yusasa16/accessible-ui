<script setup lang="ts">
</script>

<template>
	<div id="tabApp01">
		<div role="tablist">
			<button
				type="button"
				role="tab"
				id="tab1"
				aria-controls="tabpanel1"
				tabindex="0"
				aria-selected="true">
				タブ1
			</button>
			<button
				type="button"
				role="tab"
				id="tab2"
				aria-controls="tabpanel2"
				tabindex="-1"
				aria-selected="false">
				タブ2
			</button>
			<button
				type="button"
				role="tab"
				id="tab3"
				aria-controls="tabpanel3"
				tabindex="-1"
				aria-selected="false">
				タブ3
			</button>
			<button
				type="button"
				role="tab"
				id="tab4"
				aria-controls="tabpanel4"
				tabindex="-1"
				aria-selected="false">
				タブ4
			</button>
		</div>
		<div
			role="tabpanel"
			id="tabpanel1"
			aria-labelledby="tab1"
			aria-hidden="false">
			タブパネル1
		</div>
		<div
			role="tabpanel"
			id="tabpanel2"
			aria-labelledby="tab2"
			aria-hidden="true">
			タブパネル2
		</div>
		<div
			role="tabpanel"
			id="tabpanel3"
			aria-labelledby="tab3"
			aria-hidden="true">
			タブパネル3
		</div>
		<div
			role="tabpanel"
			id="tabpanel4"
			aria-labelledby="tab4"
			aria-hidden="true">
			タブパネル4
		</div>
	</div>
</template>

<style lang="scss" scoped>
[role="tablist"] {
	display: flex;
	gap: 4px;

	[role="tab"] {
		background: none;
		padding: 1rem 2rem;
		border: solid #000;
		border-width: 2px 2px 0 2px;
		cursor: pointer;

		&[aria-selected="true"] {
			color: #fff;
			background-color: #000;
		}
	}
}

[role="tabpanel"] {
	padding: 20px;
	border: 2px solid #000;

	&[aria-hidden="true"] {
		display: none;
	}
}
</style>
