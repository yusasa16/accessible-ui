<script setup lang="ts">
import { ref, Ref } from 'vue';

interface tabInterface {
	isSelected: boolean,
	tab: {
		id: string,
		text: string
	},
	panel: {
		id: string,
		text: string,
	}
}

const tabItems: Ref<tabInterface[]> = ref([
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
]);

function getTabIndex(isSelected: boolean): string {
	return (isSelected ? '0' : '-1')
};

function clickFunc(event: MouseEvent) {
	const items = tabItems.value;
	const target = event.target as HTMLElement | null;

	if(!target) return;

	for(const item of items) {
		item.isSelected = false;

		if(item.tab.id === target.id) {
			item.isSelected = true;
		}
	}
}

function keyLeftFunc(event: KeyboardEvent) {
	const index = getActiveTab();
	const target = event.target as HTMLElement | null;
	const items = tabItems.value;

	if((index === 0)) return;

	if(!target) return;

	for(const item of items) {
		item.isSelected = false;
	}

	items[index - 1].isSelected = true;

	console.log(makeFocus(index - 1));
}

function keyRightFunc(event: KeyboardEvent) {
	const index = getActiveTab();
	const target = event.target as HTMLElement | null;
	const items = tabItems.value;

	if((index === items.length - 1)) return;

	if(!target) return;

	for(const item of items) {
		item.isSelected = false;
	}

	items[index + 1].isSelected = true;

	console.log(makeFocus(index + 1));
}

function getActiveTab() {
	return tabItems.value.findIndex((el) => el.isSelected === true);
}

function makeFocus(index: number) {
	const target = document.getElementById(tabItems.value[index].tab.id);

	if(!target) return

	target.focus();
	return target;
}
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
				:aria-selected="item.isSelected"
				@click="clickFunc"
				@keydown.arrow-left="keyLeftFunc"
				@keydown.arrow-right="keyRightFunc">
				{{ item.tab.text }}
			</button>
		</div>
		<div
			v-for="item in tabItems"
			role="tabpanel"
			:id="item.panel.id"
			:aria-labelledby="item.tab.id"
			:aria-hidden="!item.isSelected"
			tabindex="0">
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
