export class TabParts {
	parentNode: HTMLElement;
	tabs: NodeListOf<HTMLElement>;
	panels: NodeListOf<HTMLElement>;
	activeTab: HTMLElement;
	selectedTab: string;

	constructor(parentNode: HTMLElement) {
		this.parentNode = parentNode;
		this.tabs = this.parentNode.querySelectorAll('[role="tab"]');
		this.panels = this.parentNode.querySelectorAll('[role="tabpanel"]');

		this.activeTab = this.tabs[0]
		// @ts-ignore
		this.selectedTab = this.tabs[0].attributes['aria-controls'].value;

		for(let i = 0; i < this.panels.length; i++) {
			const panel = this.panels[i];

			this.setPanelAttr(panel, this.activeTab);
		}

		for(let i = 0; i < this.tabs.length; i++) {
			const tab = this.tabs[i];

			this.setTabAttr(tab, this.activeTab);
			this.clickFunc(tab);
		}
	}

	/**
	 * タブの[tabindex][stis-selected]属性の値をセットする。
	 * @param tab [role='tab']にあたるhtml要素
	 * @param activeTab 現在選択されているタブのhtml要素
	 */
	setTabAttr(tab: HTMLElement, activeTab: HTMLElement): void {
		const isActive = (): boolean => tab === activeTab;

		if(isActive()) {
			tab.tabIndex = 0;
			tab.ariaSelected = 'true';
		} else {
			tab.tabIndex = -1;
			tab.ariaSelected = 'false';
		}
	}

	/**
	 * パネルの[tabindex][stis-hidden]属性の値をセットする。
	 * @param panel [role='tabpanel']にあたるhtml要素
	 * @param activeTab 現在選択されているタブのhtml要素
	 */
	setPanelAttr(panel: HTMLElement, activeTab: HTMLElement): void {
		// @ts-ignore
		const controls = activeTab.attributes['aria-controls'].value;

		panel.tabIndex = 0;

		if(panel.id === controls) {
			panel.ariaHidden = 'false';
		} else {
			panel.ariaHidden = 'true';
		}
	}

	/**
	 * タブをクリックした時の関数
	 * @param clickedTab Element クリックされたタブ要素
	 */
	clickFunc(clickedTab: Element): void {
		clickedTab.addEventListener('click', (e) => {
			const target = e.target;
			this.resetToHide();

			// @ts-ignore
			this.selectedTab = target.attributes['aria-controls'].value;
			target.ariaSelected = 'true';

			const targetPanel = this.getTargetPanel(this.selectedTab);
			targetPanel.ariaHidden = 'false';
		});
	};

	/**
	 * 全てのタブ・パネルのaria属性初期化
	 * （一旦全て選択されていない状態にする）
	 */
	resetToHide() {
		for(let i = 0; i < this.tabs.length; i++) {
			this.tabs[i].ariaSelected = 'false';
		}
		for(let i = 0; i < this.panels.length; i++) {
			this.panels[i].ariaHidden = 'true';
		}
	}

	/**
	 * タブをクリックした際、コントロール先のパネルを取得する関数
	 * @param ariaControls クリックされたタブのaria-controls属性値
	 * @returns パネルの要素（: Element）
	 */
	getTargetPanel (ariaControls: string): Element {
		const panel = Array.from(this.panels).filter((el) => {
			return el.id === ariaControls;
		})
		return panel[0];
	};
}
