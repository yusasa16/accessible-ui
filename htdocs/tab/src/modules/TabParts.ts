export class TabParts {
	parentNode: HTMLElement;
	tabs: NodeListOf<HTMLElement>;
	panels: NodeListOf<HTMLElement>;
	activeTab: HTMLElement;

	constructor(parentNode: HTMLElement) {
		this.parentNode = parentNode;
		this.tabs = this.parentNode.querySelectorAll('[role="tab"]');
		this.panels = this.parentNode.querySelectorAll('[role="tabpanel"]');

		this.activeTab = this.tabs[0];

		for(let i = 0; i < this.panels.length; i++) {
			const panel = this.panels[i];

			this.setPanelAttr(panel, this.activeTab);
		}

		for(let i = 0; i < this.tabs.length; i++) {
			const tab = this.tabs[i];
			this.setTabAttr(tab, this.activeTab);

			tab.addEventListener('click', (e) => {
				this.activeTab = e.target as HTMLElement;

				for(let i = 0; i < this.tabs.length; i++) {
					this.setTabAttr(this.tabs[i], this.activeTab);
				}
				for(let i = 0; i < this.panels.length; i++) {
					this.setPanelAttr(this.panels[i], this.activeTab);
				}
			});

			tab.addEventListener('keydown', (e) => {
				console.log('keydown');
				console.log(e.key);
			})
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
}
