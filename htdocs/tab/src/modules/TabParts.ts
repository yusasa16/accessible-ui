export class TabParts {
	parentNode: Element;
	tabs: NodeListOf<Element>;
	panels: NodeListOf<Element>;
	selectedTab: string;

	constructor(parentNode: Element) {
		this.parentNode = parentNode;
		this.tabs = this.parentNode.querySelectorAll('[role="tab"]');
		this.panels = this.parentNode.querySelectorAll('[role="tabpanel"]');

		// @ts-ignore
		this.selectedTab = this.tabs[0].attributes['aria-controls'].value;

		for(let i = 0; i < this.panels.length; i++) {
			const panel = this.panels[i] as HTMLElement;

			this.initPanelAttr(panel);
		}

		for(let i = 0; i < this.tabs.length; i++) {
			const tab = this.tabs[i] as HTMLElement;

			this.initTabAttr(tab);
			this.clickFunc(tab);
		}
	}

	initTabAttr(tab: HTMLElement, selTab?: HTMLElement) {
		tab.tabIndex = -1;
		tab.ariaSelected = 'false';

		let targetPanelId;

		if(selTab) {
			selTab.tabIndex = 0;
			selTab.ariaSelected = 'true';

			// @ts-ignore
			targetPanelId = selTab.attributes['aria-controls'].value;
		} else {
			const firstTab = this.tabs[0] as HTMLElement;
			firstTab.tabIndex = 0;
			firstTab.ariaSelected = 'true';

			// @ts-ignore
			targetPanelId = this.tabs[0].attributes['aria-controls'].value;
		}

		const targetPanel = this.getTargetPanel(targetPanelId);
		targetPanel.ariaHidden = 'false';
	}

	initPanelAttr(panel: HTMLElement) {
		panel.tabIndex = 0;
		panel.ariaHidden = 'true';
	}

	/**
	 * タブをクリックした時の関数
	 * @param clickedTab Element クリックされたタブ要素
	 */
	clickFunc(clickedTab: Element): void {
		clickedTab.addEventListener('click', (e) => {
			const target = e.target as HTMLElement;
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
