<script setup lang="ts">
const tabItems = [
	{
		isSelected: true,
		tab: {
			id: 'tab1',
			text: 'タブ1'
		},
		panel: {
			id: 'tabpanel1',
			text: 'タブパネル1'
		}
	},
	{
		isSelected: false,
		tab: {
			id: 'tab2',
			text: 'タブ2'
		},
		panel: {
			id: 'tabpanel2',
			text: 'タブパネル2'
		}
	},
	{
		isSelected: false,
		tab: {
			id: 'tab3',
			text: 'タブ3'
		},
		panel: {
			id: 'tabpanel3',
			text: 'タブパネル3'
		}
	},
	{
		isSelected: false,
		tab: {
			id: 'tab4',
			text: 'タブ4'
		},
		panel: {
			id: 'tabpanel4',
			text: 'タブパネル4'
		}
	},
];

function getTabIndex(isSelected: boolean): string {
	return (isSelected ? '0' : '-1')
};
</script>

<template>
	<div id="tabApp01">
		<div role="tablist">
			<button
				v-for="item in tabItems"
				type="button"
				role="tab"
				:id="item.tab.id"
				:aria-controls="item.panel.id"
				:tabindex="getTabIndex(item.isSelected)"
				:aria-selected="item.isSelected">
				{{ item.tab.text }}
			</button>
		</div>
		<div
			v-for="item in tabItems"
			role="tabpanel"
			:id="item.panel.id"
			:aria-labelledby="item.tab.id"
			:aria-hidden="!item.isSelected">
			{{ item.panel.text }}
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
