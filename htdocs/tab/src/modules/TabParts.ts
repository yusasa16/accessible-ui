export class TabParts {
	parentNode: HTMLElement;
	tabs: NodeListOf<HTMLElement>;
	panels: NodeListOf<HTMLElement>;
	activeTabIndex: number;
	activeTab: HTMLElement;

	constructor(parentNode: HTMLElement) {
		this.parentNode = parentNode;
		this.tabs = this.parentNode.querySelectorAll('[role="tab"]');
		this.panels = this.parentNode.querySelectorAll('[role="tabpanel"]');

		this.activeTabIndex = 0;
		this.activeTab = this.tabs[this.activeTabIndex];

		this.setAttrLoop();

		for(let i = 0; i < this.tabs.length; i++) {
			const tab = this.tabs[i];
			tab.setAttribute('data-index', i.toString());

			tab.addEventListener('click', (e) => {
				this.activeTab = e.target as HTMLElement;
				const dataIndex = this.activeTab.getAttribute('data-index') as string;
				this.activeTabIndex = parseInt(dataIndex);

				this.setAttrLoop();
			});

			tab.addEventListener('keydown', (e) => {
				switch(e.key) {
					case 'ArrowLeft':
						if(!(this.activeTabIndex <= 0)) {
							this.activeTabIndex--;
							this.activeTab = this.tabs[this.activeTabIndex];

							this.setAttrLoop();

							this.activeTab.focus();
						}
						break;
					case 'ArrowRight':
						if(!(this.activeTabIndex >= this.tabs.length - 1)) {
							this.activeTabIndex++;
							this.activeTab = this.tabs[this.activeTabIndex];

							this.setAttrLoop();

							this.activeTab.focus();
						}
						break;
					default:
						break;
				}
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
		const controls = activeTab.getAttribute('aria-controls');

		panel.tabIndex = 0;

		if(panel.id === controls) {
			panel.ariaHidden = 'false';
		} else {
			panel.ariaHidden = 'true';
		}
	}

	/**
	 * このアプリ内の全てのタブ・パネル要素に対して属性を書き換える
	 */
	setAttrLoop(): void {
		for(let i = 0; i < this.tabs.length; i++) {
			this.setTabAttr(this.tabs[i], this.activeTab);
		}
		for(let i = 0; i < this.panels.length; i++) {
			this.setPanelAttr(this.panels[i], this.activeTab);
		}
	}
}
